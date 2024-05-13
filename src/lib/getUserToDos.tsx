

export default async function getUserToDos(userId: string) {
    const res = await fetch("API Endpoint")

    if (!res.ok) throw new Error('Failed to fetch to dos')

    return res.json()
}
