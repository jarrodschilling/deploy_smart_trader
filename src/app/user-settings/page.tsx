"use client"
import GetUserByEmail from '@/services/getUserByEmail'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import SettingsForm from './components/SettingsForm'


export default function UserSettings() {
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
            <SettingsForm user={user} />
        </div>
    )
}
