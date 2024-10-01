"use server"

import GetUserByEmail from "@/services/getUserByEmail"
import bcrypt from 'bcrypt'

type Credentials = {
    email: string,
    password: string,
}

export const registrationError = async (credentials: Credentials) => {
        if (!credentials?.email) {
        throw new Error('Please enter email')
        }

        const user = await GetUserByEmail(credentials?.email)
        // console.log(`reg: ${user}`)

        if (user) {
            return false
        }

        return true
}