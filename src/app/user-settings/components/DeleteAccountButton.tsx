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
import Link from "next/link"

type UserProps = {
    user: any
}

export default function DeleteAccountButton({ user }: UserProps) {
    
    return (
        <div className="flex justify-center mx-auto">
        <div className="flex justify-center mt-8">
                <button 
                    className="mb-6 w-80 bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline">
                        <Link href={`/user-settings/delete`}>DELETE ACCOUNT</Link>
                </button>
            
            </div>
        </div>
        
    )
}
