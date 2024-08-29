"use client"
import GetUserByEmail from '@/services/getUserByEmail'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import DeleteAccountButton from '../components/DeleteAccountButton'
import DeleteAccountForm from '../components/DeleteAccountForm'
import PageTitle from '@/components/PageTitle'



export default function DeleteAccount() {
    const { data: session } = useSession()
    const [user, setUser] = useState({})
    const [error, setError] = useState("")

    useEffect (() => {
        const fetchUser = async () => {
            try {
                const userEmail = session?.user?.email
                const response = await GetUserByEmail(userEmail)
                setUser(response)
            } catch(error) {
                setError("Failed to load User, please reload the page")
            }
        };
        fetchUser()
    }, [])

    return (
        <div className='m-4 mt-20'>
            <PageTitle title={'Delete User Account'} />
            <h1 className='font-bold text-center text-xl'>Are you sure you want to PERMANENTLY DELETE this user account?</h1>
            <DeleteAccountForm user={user} />
        </div>
    )
}
