

export default async function getStockName(stockTicker: string) {
    const res = await fetch(`https://query1.finance.yahoo.com/v1/finance/quoteType/?symbol=${stockTicker}`,
        {mode: 'no-cors'}
    )
    const data = await res.json()
    console.log(`fetch response: ${data}`)


    if (!res.ok) throw new Error('Failed to fetch stock name')

    return res.json()
}
