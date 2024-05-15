

export default async function getUserTransactions(userId: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)

    if (!res.ok) throw new Error('Failed to fetch transactions')

    return res.json()
}
