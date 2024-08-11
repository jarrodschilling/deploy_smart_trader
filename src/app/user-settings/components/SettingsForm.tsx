"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { userLoginSchema, userSettingsSchema } from "../../../../schemas/schema"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { LoginFormData, UserSettings } from "../../../../types"
import { signIn } from "next-auth/react"
import Link from "next/link"
import GoogleButtonLogin from "@/components/GoogleButtonLogin"
import { useEffect, useState } from "react"
import UpdateUser from "@/services/updateUser"
import { User } from "@prisma/client"

type UserProps = {
    user: any
}

export default function SettingsForm({ user }: UserProps) {
    
    const {
        register,
        handleSubmit,
        formState:{errors},
        setValue,
    } = useForm<UserSettings>({
        resolver: zodResolver(userSettingsSchema)
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
    async function handleUpdateUser(data: UserSettings) {
        const updatedData = {...data, email:user.email}
        UpdateUser(updatedData, user.id)
        router.push('/dashboard')
    }
    return (
        <div className="flex justify-center mx-auto">
        <div className="border-2 border-slate-200 bg-black rounded-md w-1/4 flex justify-center mt-10">
        <div className="w-full max-w-lg p-8">
        <form className="" onSubmit={handleSubmit(handleUpdateUser)}>
            <h1 className="text-3xl font-bold text-slate-200 mb-2">Update Settings</h1>
            <div className="flex flex-wrap -mx-3 mb-6 mt-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-slate-200 text-sm font-bold mb-2" htmlFor="name">Name</label>
                <input 
                    {...register("name")}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    name="name"
                    id="name"
                />
                {
                    errors.name && (
                        <p>
                            {errors.name.message}
                        </p>
                    )
                }
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6 mt-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-slate-200 text-sm font-bold mb-2" htmlFor="portfolioValue">portfolioValue</label>
                <input 
                    {...register("portfolioValue")}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    name="portfolioValue"
                    id="portfolioValue"
                />
                {
                    errors.portfolioValue && (
                        <p>
                            {errors.portfolioValue.message}
                        </p>
                    )
                }
                </div>
            </div>
                <button 
                    className="mb-6 mt-4 w-44 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="submit">
                        Update
                </button>
                
                
            </form>
            </div>
            
        </div>
        </div>
    )
}
