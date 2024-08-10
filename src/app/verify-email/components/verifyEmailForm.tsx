"use client"
import { newVerification } from "@/lib/emailTokenVerification";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { FormSuccess } from "./FormSuccess";
import Link from "next/link";
import { FormError } from "./FormError";

export default function VerifyEmailForm() {
    const [error, setError] = useState<string | undefined>(undefined)
    const [success, setSuccess] = useState<string | undefined>(undefined)
    const [test, setTest] = useState<string | undefined>("email verified")
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    
    const onSubmit = useCallback(() => {
        if(success || error) {
            return
        }

        if(!token) {
            setError("no token provided")
        } else {
            newVerification(token).then((data) => {
                if(data.success) {
                    setSuccess(data.success)
                }
                if(data.error) {
                    setError(data.error)
                }
            })
        }

    }, [token, success, error])

    useEffect(() => {
        onSubmit()
    }, [])

    return (
        <>
        <div className="flex justify-center mx-auto">
            <div className="border-2 border-slate-200 bg-black rounded-md w-1/4 flex justify-center mt-10">
            <div className="w-full max-w-lg p-8">
            <h1 className="text-lg font-bold text-slate-200 mb-2">Confirming your email address</h1>
            <div>
                {!success && !error && <p>Loading</p>}
                <FormSuccess message={success} />
                {!success && <FormError message={error}/>}
            </div>
            <button className="mt-6">
                <Link 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-20 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    href="/login">
                        Sign In
                </Link>
            </button>
            </div>
            </div>
            </div>
        </>
    )
}
