import { app_domain } from "@/lib/domain"

export default async function GetTokenByToken(token: string) {
    
    const res = await fetch(`${app_domain}/api/tokens/${token}`, {
        method: "GET",
    })


    if (!res.ok) throw new Error("failed to fetch data")
    
    return res.json()
}