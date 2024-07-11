

export default async function getStockName(stockTicker: string) {
    const res = await fetch(`http://localhost:3000/api/yfQuote/${stockTicker}`,
        {mode: 'no-cors'}
    )
    
    if (!res.ok) throw new Error("failed to fetch data")
        // if (!res.ok) {
        //     return false
        // }
    return res.json()
}
