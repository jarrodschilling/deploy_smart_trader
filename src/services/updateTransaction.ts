import { app_domain } from "@/lib/domain"
import { AddTransactionFormData } from "../../types"

export default async function UpdateTransaction(data: AddTransactionFormData, id: string) {
    const res = await fetch(`${app_domain}/api/transactions/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}