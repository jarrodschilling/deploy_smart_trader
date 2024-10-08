"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { userRegisterSchema } from "../../../../schemas/schema"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { RegisterFormData } from "../../../../types"
import CreateUser from "@/services/createUser"
import GoogleButtonRegister from "@/components/GoogleButtonRegister"
import { useState } from "react"
import { registrationError } from "@/lib/registrationError"



export default function RegisterUserForm() {
    const { data: session, status } = useSession()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm<RegisterFormData>({
        resolver: zodResolver(userRegisterSchema)
        })

    const router = useRouter()
    async function handleAddUser(data: RegisterFormData) {
        const checkEmail = await registrationError(data)
        
        if(checkEmail){
            CreateUser(data).then((res) => {
                if(res.success) {
                    setSuccess(true)
                }
            })
        } else {
            // alert("Email already exists")
            setError("EMAIL ALREADY EXISTS")
        }

        // router.push('/dashboard')
    }
    return (
        <div className="flex justify-center mx-auto">
        <div className="border-2 border-slate-200 bg-black rounded-md w-96 flex justify-center">
        <div className="w-full max-w-lg p-8 pt-6 pb-6">
        
        <form className="" onSubmit={handleSubmit(handleAddUser)}>
        <h1 className="text-3xl font-bold text-slate-200 mb-2">Create Account</h1>
        {
            error?<h4 className="text-lg font-bold text-red-500">{error}</h4>:
            <h4 className="text-sm">Take back control of your trading</h4>
        }
            <div className="flex flex-wrap -mx-3 mb-4 mt-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-slate-200 text-sm font-bold mb-2" htmlFor="name">Name*</label>
                <input
                    {...register("name", { required: "This is required." })}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Luke Skywalker"
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
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-slate-200 text-sm font-bold mb-2" htmlFor="email">Email*</label>
                <input 
                    {...register("email")}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="luke_skywalk82@email.com"
                    
                />
                {
                    errors.email && (
                        <p>
                            {errors.email.message}
                        </p>
                    )
                }
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-slate-200 text-sm font-bold mb-2" htmlFor="password">Password*</label>
                <input 
                    {...register("password")}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="**********"
                />
                {
                    errors.password?(
                        <p>
                            {errors.password.message}
                        </p>
                    ):<p className="text-xs text-blue-500">*Uppercase, lowercase, number, and symbol required*</p>
                }
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-slate-200 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password*</label>
                <input 
                    {...register("confirmPassword")}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="**********"
                />
                {
                    errors.confirmPassword && (
                        <p>
                            {errors.confirmPassword.message}
                        </p>
                    )
                }
                </div>
            </div>
                {
                    (!success)?<></>:
                    <p
                        className="w-full text-center mb-4 -mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Email verification was sent!
                    </p>
                }
                

                <button 
                    className="w-44 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="submit">
                        Create Account
                </button>
                
            </form>
            <p className="mt-1 mb-1 w-44 text-center">OR</p>
                <GoogleButtonRegister />
            </div>
        </div>
        </div>
    )
}
