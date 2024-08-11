
export default async function UpdateUser(data: any, id: string | null) {
    const res = await fetch(`http://localhost:3000/api/users/${data.email}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}