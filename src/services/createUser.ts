import { app_domain } from "@/lib/domain"
import { RegisterFormData } from "../../types"

export default async function CreateUser(data: RegisterFormData) {
    const res = await fetch(`${app_domain}/api/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    const responseData = await res.json()

    if (!res.ok) {
        throw new Error(responseData.message || "failed to fetch data")
        // return { success: false, message: responseData.message || "Failed to fetch data" };
    }
    return responseData
}