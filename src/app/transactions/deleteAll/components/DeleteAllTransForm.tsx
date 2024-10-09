'use client'

import { app_domain } from "@/lib/domain"
import DeleteAllTransactions from "@/services/deleteAllTransactions"
import GetUserByEmail from "@/services/getUserByEmail"
import { Transaction, User } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { mutate } from "swr"



export default function DeleteAllTransForm() {
    const [user, setUser] = useState<User | any>(null)
    const [error, setError] = useState("")
    const { data: session, status } = useSession()
    const email = session?.user?.email;

    useEffect (() => {
        const fetchUser = async () => {
            try {
                const userEmail = session?.user?.email
                
                const response = await GetUserByEmail(userEmail)
                
                setUser(response)
            } catch(error) {
                setError("Failed to load User, please reload the page")
            }
        };
        fetchUser()
    }, [])

    

    const router = useRouter()

    async function handleFormSubmit (e: React.FormEvent) {
        e.preventDefault()
        const userId = await user.id
        await DeleteAllTransactions(userId)
        await mutate(`${app_domain}/api/users/${email}`)
        router.push('/transactions')
    }
    
    return (
    <form className="w-full max-w-lg" onSubmit={handleFormSubmit}>
        <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit">
                Delete ALL Transactions
        </button>
    </form>
  )
}
