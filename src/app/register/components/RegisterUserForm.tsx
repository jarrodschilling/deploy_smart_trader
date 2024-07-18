"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { userRegisterSchema } from "../../../../schemas/schema"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { RegisterFormData } from "../../../../types"
import CreateUser from "@/services/createUser"
import GoogleButtonRegister from "@/components/GoogleButtonRegister"



export default function RegisterUserForm() {
    const { data: session, status } = useSession()

    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm<RegisterFormData>({
        resolver: zodResolver(userRegisterSchema)
        })

    const router = useRouter()
    async function handleAddUser(data: RegisterFormData) {
        console.log(data)
        CreateUser(data)
        router.push('/dashboard')
    }
    return (
        <div className="flex justify-center mx-auto">
        <div className="border-2 border-slate-200 bg-black rounded-md w-1/4 flex justify-center mt-10">
        <div className="w-full max-w-lg p-8">
        
        <form className="" onSubmit={handleSubmit(handleAddUser)}>
        <h1 className="text-3xl font-bold text-slate-200 mb-2">Create Account</h1>
        <h4 className="text-sm">Take back control of your trading</h4>
            <div className="flex flex-wrap -mx-3 mb-6 mt-6">
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
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-slate-200 text-sm font-bold mb-2" htmlFor="email">Email*</label>
                <input 
                    {...register("email")}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="luke_skywalk82@email.com"
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
            <div className="flex flex-wrap -mx-3 mb-10">
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
                    errors.password && (
                        <p>
                            {errors.password.message}
                        </p>
                    )
                }
                </div>
            </div>
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
