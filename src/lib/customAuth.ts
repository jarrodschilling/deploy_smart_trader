"use server"

import GetUserByEmail from "@/services/getUserByEmail"
import bcrypt from 'bcrypt'

type Credentials = {
    email: string,
    password: string,
}

export const customAuth = async (credentials: Credentials) => {
        if (!credentials?.email || !credentials?.password) {
        throw new Error('Please enter email and password')
        }

        const user = await GetUserByEmail(credentials?.email)

        if (!user || !user?.password) {
            return false
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password)

        if (!passwordMatch) {
            return false
        }

        // if(!user?.emailVerified) {
        //     return false
        // }

        return true
}