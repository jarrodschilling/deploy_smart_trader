export default async function CreateTransaction(id: string) {
    const res = await fetch(`http://localhost:3000/api/transactions/${id}`, {
        method: "DELETE",
    })

    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}