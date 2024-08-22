import { app_domain } from "@/lib/domain"

export default async function GetAllTransactions() {
    const res = await fetch(`${app_domain}/api/transactions`, {
        method: 'GET',
        cache: 'no-store',
        next: { tags: ['collection']}
    })

    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}