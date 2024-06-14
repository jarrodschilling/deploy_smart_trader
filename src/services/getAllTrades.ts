export default async function GetAllTrades() {
    const res = await fetch('http://localhost:3000/api/:id/trades')

    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}