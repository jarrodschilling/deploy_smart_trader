"use client"
import { signIn } from 'next-auth/react'
import React from 'react'
import Image from 'next/image'

export default function GoogleButtonRegister() {
    return (
    <>
        <button onClick={() => signIn('google', {callbackUrl: 'http://localhost:3000/dashboard'})}>
            {/* <img src="/google/web_light_sq_SU@1x.png" alt=""></img> */}
            <Image 
                src="/google/web_light_sq_SU@1x.png"
                alt=""
                height={40}
                width={179}
            />
        </button>
    </>
    )
}