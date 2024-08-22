import { app_domain } from "@/lib/domain"


export default async function CreateVerificationToken(data: any) {
    const res = await fetch(`${app_domain}/api/tokens`, {
        method: "POST",
        body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}