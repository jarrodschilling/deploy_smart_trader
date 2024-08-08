"use client"
import { newVerification } from "@/lib/emailTokenVerification";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export default function VerifyEmailForm() {
    const [error, setError] = useState<string | undefined>(undefined)
    const [success, setSuccess] = useState<string | undefined>(undefined)
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

        </>
    )
}
