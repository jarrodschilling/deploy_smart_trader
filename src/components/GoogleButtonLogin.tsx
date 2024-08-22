"use client"
import { signIn } from 'next-auth/react'
import React from 'react'
import Image from 'next/image'
import { app_domain } from '@/lib/domain'

export default function GoogleButtonLogin() {
    return (
    <>
        <button onClick={() => signIn('google', {callbackUrl: `${app_domain}/dashboard`})}>
            {/* <img src="/google/web_light_sq_SI@1x.png" alt=""></img> */}
            <Image 
                src="/google/web_light_sq_SI@1x.png"
                alt=""
                height={40}
                width={175}
            />
        </button>
    </>
    )
}