export default async function GetAllToDos() {
    const res = await fetch('http://localhost:3000/api/toDos', {
        method: 'GET',
        cache: 'no-store',
        next: { tags: ['collection']}
    })

    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}