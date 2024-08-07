"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { userLoginSchema } from "../../../../schemas/schema"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { LoginFormData } from "../../../../types"
import { signIn } from "next-auth/react"
import Link from "next/link"
import GoogleButtonLogin from "@/components/GoogleButtonLogin"
import { useState } from "react"





export default function LoginUserForm() {
    const { data: session, status } = useSession()
    const [credentialError, setCredentialError] = useState("")

    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm<LoginFormData>({
        resolver: zodResolver(userLoginSchema)
        })

    const router = useRouter()
    async function handleAddUser(data: LoginFormData) {
        const login = await signIn('credentials', {...data, callbackUrl: 'http://localhost:3000/dashboard', redirect: false})
        if (login?.ok) {
            router.push('/dashboard')
        } else {
            setCredentialError("Invalid Credentials")
        }
    }
    return (
        <div className="flex justify-center mx-auto">
        <div className="border-2 border-slate-200 bg-black rounded-md w-1/4 flex justify-center mt-10">
        <div className="w-full max-w-lg p-8">
        <form className="" onSubmit={handleSubmit(handleAddUser)}>
            <h1 className="text-3xl font-bold text-slate-200 mb-2">Login to Account</h1>
            <span className="text-lg font-bold text-blue-500">{credentialError}</span>
            <div className="flex flex-wrap -mx-3 mb-6 mt-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-slate-200 text-sm font-bold mb-2" htmlFor="email">Email*</label>
                <input 
                    {...register("email")}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="email"
                    name="email"
                    id="email"
                    // onChange={(e) => console.log(e.target.value)}
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
            <div className="flex flex-wrap -mx-3 mb-6 mt-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-slate-200 text-sm font-bold mb-2" htmlFor="password">Password*</label>
                <input 
                    {...register("password")}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="password"
                    name="password"
                    id="password"
                />
                {
                    errors.password && (
                        <p>
                            {errors.password.message}
                        </p>
                    )
                }
                </div>
            </div>
                <button 
                    className="mb-6 mt-4 w-44 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="submit">
                        Login
                </button>
                
                
            </form>
            <GoogleButtonLogin />
                <p className="mt-1 mb-2 w-44 text-center">OR</p>
                <button className="mt-2">
                        <Link 
                            className="w-44 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 rounded focus:outline-none focus:shadow-outline"
                            href={"/register"}>Create Account</Link>
                </button>
            </div>
            
            {/* <button 
                onClick={() => signIn('google', {callbackUrl: 'http://localhost:3000/dashboard'})}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >Sign In</button> */}
            
        </div>
        </div>
    )
}
