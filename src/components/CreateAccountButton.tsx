"use client"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

export default function CreateAccountButton() {
    const { data: session } = useSession()

    if (session) {
        return (
            <>
            </>
        )
    }
    return (
        <>
        <div className='flex m-1 mb-2'>
            <div>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <Link href="/register">Create New Account</Link>
                </button>
            </div>
        </div>
        </>
    )
}