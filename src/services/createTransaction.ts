import { AddTransactionFormData } from "../../types"

export default async function CreateTransaction(data: AddTransactionFormData) {
    const res = await fetch('http://localhost:3000/api/transactions', {
        method: "POST",
        body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}