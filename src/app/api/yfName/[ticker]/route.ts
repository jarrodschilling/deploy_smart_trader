
export async function GET(request: Request, { params }: { params: {ticker: string} }) {
    // console.log(`route.ts: ${request}`)
    const ticker = params.ticker
    

    const yahooResponse = await fetch(`https://query1.finance.yahoo.com/v1/finance/quoteType/?symbol=${ticker}`);
    const data = await yahooResponse.json();
    

    return Response.json(data);
}