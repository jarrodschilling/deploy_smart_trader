"use server"

import GetUserByEmail from "@/services/getUserByEmail"
import DeleteVerificationToken from "@/services/tokens/deleteVerificationToken"
import GetTokenByToken from "@/services/tokens/tokenByToken"
import UpdateUser from "@/services/updateUser"

export const newVerification = async (token: string) => {
    const existingToken = await GetTokenByToken(token)

    if(!existingToken) {
        return { error: "Invalid token" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if(hasExpired) {
        return { error: "Token has expired" }
    }

    const existingUser = await GetUserByEmail(existingToken.email)


    if(!existingUser) {
        return { error: "User not found" }
    }   

    const userUpdateData = {
        emailVerified: new Date(),
        email: existingToken.email
    }

    await UpdateUser(userUpdateData, existingUser.email)

    await DeleteVerificationToken(existingToken.id, existingToken.email)

    return { success: "Email verified" }
}