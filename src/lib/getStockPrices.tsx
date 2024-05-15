

export default async function getStockPrices(stockTicker: string) {
    const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${stockTicker}`)

    if (!res.ok) throw new Error('Failed to fetch stock price')

    return res.json()
}
