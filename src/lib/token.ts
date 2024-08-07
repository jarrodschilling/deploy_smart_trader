import { v4 as uuidv4 } from 'uuid';
import { database } from './database';
import GetTokenByIdentifier from '@/services/tokens/tokenByIdentifier';

export const generateVerificationToken = async (identifier: string) => {
    // Generate a random token 
    const token = uuidv4();
    const expires = new Date().getTime() + 1000 * 60 * 60 * 24; // 24 hours

    // Check if a token already exists for the user
    const existingToken = await GetTokenByIdentifier(identifier)

    if(existingToken) {
        await database.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    // Create a new verification token
    const verificationToken = await database.verificationToken.create({
        data: {
            email,
            token,
            expires: new Date(expires)
        }
    })

    return verificationToken;
}