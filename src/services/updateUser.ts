import { app_domain } from "@/lib/domain"

export default async function UpdateUser(data: any, id: string | null) {
    const res = await fetch(`${app_domain}/api/users/${data.email}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}