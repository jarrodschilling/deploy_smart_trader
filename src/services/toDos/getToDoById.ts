import { app_domain } from "@/lib/domain"

export default async function GetToDoById(id: string) {

    const res = await fetch(`${app_domain}/api/toDos/${id}`, {
        method: "GET",
    })


    if (!res.ok) throw new Error("failed to fetch data")
    
    return res.json()
}