import { app_domain } from "@/lib/domain"
import { AddToDoFormData } from "../../../types"

export default async function UpdateToDo(data: AddToDoFormData, id: string) {
    const res = await fetch(`${app_domain}/api/toDos/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}