
import db from "@/lib/prisma";


export async function GET(request: Request, { params }: { params: {token: string} }) {
    
    const tokenIdentifier = params.token
    const verificationToken = await db.verificationToken.findFirst({
        where: {
            token: tokenIdentifier
        }
    })

    return Response.json(verificationToken)
}
