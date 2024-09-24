import { app_domain } from "@/lib/domain"

export default async function GetUserByEmail(email: string | null | undefined) {
    
    const res = await fetch(`${app_domain}/api/users/${email}`, {
        method: "GET",
        cache: 'no-store',
    })


    if (!res.ok) throw new Error("failed to fetch data")
    // if (!res.ok) {
    //     return false
    // }
    return res.json()
}