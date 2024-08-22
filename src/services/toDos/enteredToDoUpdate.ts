import { app_domain } from "@/lib/domain"
import { AddToDoFormData } from "../../../types"

export default async function EnteredToDoUpdate(data: any, id: string) {
    const res = await fetch(`${app_domain}/api/toDos/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}