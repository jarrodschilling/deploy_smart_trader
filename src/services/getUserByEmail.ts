export default async function GetUserByEmail(email: string | null | undefined) {
    const res = await fetch(`http://localhost:3000/api/users/${email}`, {
        method: "GET",
    })

    if (!res.ok) throw new Error("failed to fetch data")
    // if (!res.ok) {
    //     return false
    // }
    return res.json()
}