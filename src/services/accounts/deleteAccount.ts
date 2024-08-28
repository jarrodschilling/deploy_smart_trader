import { app_domain } from "@/lib/domain"

export default async function DeleteAccount(id: any) {

    const res = await fetch(`${app_domain}/api/account/${id}`, {
        method: "DELETE",
    })


    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}