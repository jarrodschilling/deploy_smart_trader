import { AddToDoFormData } from "../../../types"

export default async function CreateToDo(data: AddToDoFormData) {
    const res = await fetch('http://localhost:3000/api/toDos', {
        method: "POST",
        body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}