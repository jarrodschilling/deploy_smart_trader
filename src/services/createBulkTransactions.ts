import { app_domain } from "@/lib/domain"
import { AddTransactionFormData } from "../../types"

export default async function CreateBulkTransactions(transactions: AddTransactionFormData[]) {
    
    for(const transaction of transactions) {
        
        const res = await fetch(`${app_domain}/api/transactions`, {
            method: "POST",
            body: JSON.stringify(transaction)
        })
        // handle this on error.ts
        if (!res.ok) throw new Error("failed to fetch data")
        // return res.json()
    }
}