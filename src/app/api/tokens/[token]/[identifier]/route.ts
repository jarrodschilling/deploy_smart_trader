
import db from "@/lib/prisma";

export async function DELETE(request: Request, { params }: { params: {token: string, identifier: string} }) {
    
    const tokenToken = params.token
    const tokenIdentifier = params.identifier

    const token = await db.verificationToken.delete({
        where: {
            identifier_token: {
                token: tokenToken,
                identifier: tokenIdentifier,
            }
        },
    })
    return Response.json(token)
}