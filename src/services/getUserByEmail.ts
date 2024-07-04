export default async function GetUserByEmail(email: string) {
    const res = await fetch(`http://localhost:3000/api/users/${email}`, {
        method: "GET",
    })

    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}