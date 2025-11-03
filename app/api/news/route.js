import { NextResponse } from "next/server";
import { title } from "process";

export async function GET() {
    const apikey = process.env.COINMARKETCAP_API_KEY;
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`;
    const headers = {
        'X-CMC_PRO_API_KEY': apikey};


    try {
        const response = await fetch(url, { headers });
        const data = await response.json();
        const simplified = data.data.slice(0, 10).map(coin => ({
            id: coin.id,
            title: `${coin.name} (${coin.symbol}) update`,
            body: `${coin.name} is currently priced at $${coin.quote.USD.price.toFixed(2)} with a 24h change of ${coin.quote.USD.percent_change_24h.toFixed(2)}%.`,
            link: `https://coinmarketcap.com/currencies/${coin.slug}/`,
        }));
        return NextResponse.json({ data: simplified });
    } catch (error) {
        console.error("Error fetching news:", error);
        return NextResponse.json({ data: [] }, { status: 500 });
    }
}