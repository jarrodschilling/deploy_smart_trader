

export default async function getUserTransactions(userId: string) {
    const res = await fetch("API Endpoint")

    if (!res.ok) throw new Error('Failed to fetch transactions')

    return res.json()
}
