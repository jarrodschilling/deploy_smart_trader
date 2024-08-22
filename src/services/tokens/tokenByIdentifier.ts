import { app_domain } from "@/lib/domain"

export default async function GetTokenByIdentifier(identifier: string) {
    
    const res = await fetch(`${app_domain}/api/verification-tokens/${identifier}`, {
        method: "GET",
    })


    if (!res.ok) throw new Error("failed to fetch data")
    
    return res.json()
}