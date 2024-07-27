import { AddToDoFormData } from "../../../types"

export default async function UpdateToDo(data: AddToDoFormData, id: string) {
    const res = await fetch(`http://localhost:3000/api/toDos/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}