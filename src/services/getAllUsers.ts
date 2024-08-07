export default async function GetAllUsers() {
    const res = await fetch('http://localhost:3000/api/users', {
        method: "GET",
        // cache: "no-store"
    })

    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}