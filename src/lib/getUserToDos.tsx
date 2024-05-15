

export default async function getUserToDos(userId: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)

    if (!res.ok) throw new Error('Failed to fetch to dos')

    return res.json()
}
