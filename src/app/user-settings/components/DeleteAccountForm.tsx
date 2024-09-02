"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { deleteUserSchema } from "../../../../schemas/schema"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { LoginFormData, UserSettings } from "../../../../types"
import { useEffect, useState } from "react"
import DeleteAccount from "@/services/accounts/deleteAccount"
import GetAccountById from "@/services/accounts/getAccountById"
import DeleteUser from "@/services/deleteUser"
import { app_domain } from "@/lib/domain"

type UserProps = {
    user: any
}

export default function DeleteAccountForm({ user }: UserProps) {
    
    const {
        register,
        handleSubmit,
        formState:{errors},
        setValue,
    } = useForm<UserSettings>({
        resolver: zodResolver(deleteUserSchema)
        })

        useEffect(() => {
            if (user) {
                const fields: (keyof UserSettings)[] = ["name", "portfolioValue", "id", "name"]
                fields.forEach(field => {
                        setValue(field, user[field])
                })
            }
        }, [user, setValue])

    const router = useRouter()


    async function handleDeleteUser(data: UserSettings) {
        const updatedData = {...data, email:user.email}
        
        const userAccount = await GetAccountById(user.id)
        
        if (userAccount) {
            DeleteAccount(user.id)
        }
        DeleteUser(updatedData, user.id)
        const logout = await signOut({callbackUrl: `${app_domain}`})
        router.push('/')
    }

    return (
        <div className="flex justify-center mx-auto">
        <div className="flex justify-center mt-8">
        
        <form className="" onSubmit={handleSubmit(handleDeleteUser)}>
                <button 
                    className="mt-10 mb-6 w-80 bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="submit">
                        DELETE ACCOUNT
                </button>
            </form>
            </div>
        </div>
        
    )
}
