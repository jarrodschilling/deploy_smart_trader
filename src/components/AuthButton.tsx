"use client"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { app_domain } from "@/lib/domain"

export default function AuthButton() {
    const { data: session } = useSession()

    if (session) {
        return (
            <>
                <span className="mr-2 text-center">
                    WELCOME
                    <br></br>
                    {session?.user?.name}
                </span>
                <button onClick={() => signOut({callbackUrl: `${app_domain}`})} className="md:mt-0 md:mb-0 mt-4 mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Out</button>
            </>
        )
    }
    return (
        <>
            <span className="mr-2">
                    
                </span>
            {/* <button onClick={() => signIn()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign In</button> */}
            <button className="md:mt-0 md:mb-0 mt-4 mb-2"><Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" href="/login">Sign In</Link></button>
        </>
    )
}