"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { userRegisterSchema } from "../../../../schemas/schema"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { RegisterFormData } from "../../../../types"
import CreateUser from "@/services/createUser"


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
        <>
        <br />
        <br />
        <br />
        <h1>Register User</h1>
        <form className="w-full max-w-lg" onSubmit={handleSubmit(handleAddUser)}>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">Name*</label>
                <input
                    {...register("name", { required: "This is required." })}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="First Last Name"
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
            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">Email*</label>
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
            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">Password*</label>
                <input 
                    {...register("password")}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
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
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="submit">
                        Register User
                </button>
            </form>
        </>
    )
}
