import { v4 as uuidv4 } from 'uuid';
import GetTokenByIdentifier from '@/services/tokens/tokenByIdentifier';
import DeleteVerificationToken from '@/services/tokens/deleteVerificationToken';
import CreateVerificationToken from '@/services/tokens/createVerificationToken';

export const generateVerificationToken = async (identifier: string) => {
    console.log(`Step 1: ${identifier}`)
    // Generate a random token 
    const token = uuidv4();
    const expires = new Date().getTime() + 1000 * 60 * 60 * 24; // 24 hours

    // Check if a token already exists for the user
    const existingToken = await GetTokenByIdentifier(identifier)

    if(existingToken) {
        DeleteVerificationToken(existingToken.token, identifier)
    }

    // Create a new verification token
    const data = {
        identifier: identifier,
        token: token,
        expires: new Date(expires)
    }
    const verificationToken = await CreateVerificationToken(data)

    return verificationToken;
}