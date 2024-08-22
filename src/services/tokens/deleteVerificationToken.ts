import { app_domain } from "@/lib/domain"

export default async function DeleteVerificationToken(token: string, identifier: string) {

    const res = await fetch(`${app_domain}/api/tokens/${token}/${identifier}`, {
        method: "DELETE",
    })


    if (!res.ok) throw new Error("failed to fetch data")
    
    return res.json()
}