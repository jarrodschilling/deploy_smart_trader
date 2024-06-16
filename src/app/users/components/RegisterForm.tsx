"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { userRegisterSchema } from "../../../../schemas/schema"
import CreateUser from "@/services/createUser"

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState:{errors},
        reset,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(userRegisterSchema)
        })
    async function handleRegister(data: RegisterFormData) {
        console.log(data)
        CreateUser(data)
    }
    return (
        <>
            <h1>Register User</h1>
            <form className="tradeForm" onSubmit={handleSubmit(handleRegister)}>
                    <label htmlFor="firstName">firstName</label>
                    <input
                        {...register("firstName")}
                        type="text"
                        name="firstName"
                        id="firstName"
                    />
                    {
                        errors.firstName && (
                            <p>
                                {errors.firstName.message}
                            </p>
                        )
                    }

                    <label htmlFor="lastName">lastName</label>
                    <input 
                        {...register("lastName")}
                        type="text"
                        name="lastName"
                        id="lastName"
                    />
                    {
                        errors.lastName && (
                            <p>
                                {errors.lastName.message}
                            </p>
                        )
                    }

                    <label htmlFor="email">email</label>
                    <input
                        {...register("email")}
                        type="email"
                        name="email"
                        id="email"
                    />
                    {
                        errors.email && (
                            <p>
                                {errors.email.message}
                            </p>
                        )
                    }

                    <label htmlFor="userName">username</label>
                    <input
                        {...register("userName")}
                        type="text"
                        name="userName"
                        id="userName"
                    />
                    {
                        errors.userName && (
                            <p>
                                {errors.userName.message}
                            </p>
                        )
                    }

                    <label htmlFor="password">password</label>
                    <input
                        {...register("password")}
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

                    <button className="confirmTrade" type="submit">Register User</button>
                </form>
        </>
    )
}
