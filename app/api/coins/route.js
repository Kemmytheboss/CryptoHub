export async function GET() {
    try {
        const response = await fetch (
            'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=20',
            {
                headers: {
                    'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
                },
                next: { revalidate: 60 },
            }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return Response.json(data.data);    
    } catch (error) {
        console.error("Error fetching coins:", error);
        return Response.json({ error: "Failed to fetch coins" }, { status: 500 });
    }
}