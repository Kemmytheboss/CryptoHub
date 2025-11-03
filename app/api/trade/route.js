import { NextResponse} from 'next/server';
import crypto from 'crypto-js';

export async function POST(request) {
    const { symbol, side, quantity, price } = await request.json();

    const apiKey = process.env.BINANCE_API_KEY;
    const secretKey = process.env.BINANCE_SECRET_KEY;
    const apiUrl = process.env.BINANCE_API_URL || 'https://testnet.binance.vision';

    const endpoint = '/api/v3/order';
    const timestamp = Date.now();

    const params = new URLSearchParams({
        symbol,
        side,
        type: 'LIMIT',
        timeInForce: 'GTC',
        quantity: quantity.toString(),
        price: price.toString(),
        timestamp: timestamp.toString(),
    });

    const signature = crypto.HmacSHA256(params.toString(), secretKey).toString(crypto.enc.Hex);
    params.append('signature', signature);

    try {
        const response = await fetch(`${apiUrl}${endpoint}?${params.toString()}`, {
            method: 'POST',
            headers: {
                'X-MBX-APIKEY': apiKey,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Binance API Error: ${errorData.msg}`);
        }

        const data = await response.json();
        return NextResponse.json({ success: true, order: data });
    } catch (error) {
        console.error('Error placing order:', error);
        return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
    }
}