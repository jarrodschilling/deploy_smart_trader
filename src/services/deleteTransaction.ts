import { app_domain } from "@/lib/domain"

export default async function DeleteTransaction(id: string) {

    const res = await fetch(`${app_domain}/api/transactions/${id}`, {
        method: "DELETE",
    })


    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}