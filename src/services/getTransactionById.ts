import { app_domain } from "@/lib/domain"

export default async function GetTransactionById(id: string) {
    
    const res = await fetch(`${app_domain}/api/transactions/${id}`, {
        method: "GET",
        cache: 'no-store',
    })


    if (!res.ok) throw new Error("failed to fetch data")
    
    return res.json()
}