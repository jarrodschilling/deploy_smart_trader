import { AddToDoFormData } from "../../../types"

export default async function EnteredToDoUpdate(data: AddToDoFormData, id: string) {
    const res = await fetch(`http://localhost:3000/api/toDos/${id}/entered`, {
        method: "PATCH",
        body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}