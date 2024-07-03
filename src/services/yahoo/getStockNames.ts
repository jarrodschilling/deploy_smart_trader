

export default async function getStockNames(stockTicker: string) {
    const res = await fetch(`https://query1.finance.yahoo.com/v1/finance/quoteType/?symbol=${stockTicker}`)

    if (!res.ok) throw new Error('Failed to fetch stock name')

    return res.json()
}
