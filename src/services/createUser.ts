import { app_domain } from "@/lib/domain"
import { RegisterFormData } from "../../types"

export default async function CreateUser(data: RegisterFormData) {
    const res = await fetch(`${app_domain}/api/users`, {
        method: "POST",
        body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}