import { AddToDoFormData } from "../../../types"

export default async function UrgentToDoUpdate(data: any, id: string) {
    const res = await fetch(`http://localhost:3000/api/toDos/${id}/urgent`, {
        method: "PATCH",
        body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}