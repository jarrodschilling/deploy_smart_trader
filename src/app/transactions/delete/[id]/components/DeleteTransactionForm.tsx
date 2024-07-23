'use client'

import DeleteTransaction from "@/services/deleteTransaction"
import { Transaction } from "@prisma/client"
import { useRouter } from "next/navigation"


type TransactionProps = {
  transaction: Transaction
}

export default function DeleteTransactionForm({ transaction }: TransactionProps) {
  const router = useRouter()
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      const user = Object.fromEntries(new FormData(event.currentTarget))
      DeleteTransaction(transaction.id)
      router.push('/transactions')
    } catch (error: any) {
      console.error({ error })
    }
  }
  
  return (
    <form className="w-full max-w-lg" onSubmit={handleFormSubmit}>
        <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit">
                Delete Transaction
        </button>
    </form>
  )
}
