import { AddTransactionFormData } from "../../types"

export default async function CreateBulkTransactions(transactions: AddTransactionFormData[]) {
    console.log(transactions)
    for(const transaction of transactions) {
        // console.log(transaction)
        const res = await fetch('http://localhost:3000/api/transactions', {
            method: "POST",
            body: JSON.stringify(transaction)
        })

        if (!res.ok) throw new Error("failed to fetch data")
        // return res.json()
    }
}