"use client"
import { app_domain } from '@/lib/domain'
import { signIn } from 'next-auth/react'
import React from 'react'

export default function GoogleButton() {
    return (
    <>
        <button onClick={() => signIn('google', {callbackUrl: `${app_domain}/dashboard`})}>
            <img src="/google/web_light_sq_SI@1x.png" alt=""></img>
        </button>
    </>
    )
}
