import { app_domain } from "@/lib/domain"
import { AddToDoFormData } from "../../../types"

export default async function CreateToDo(data: AddToDoFormData) {
    const res = await fetch(`${app_domain}/api/toDos`, {
        method: "POST",
        body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}