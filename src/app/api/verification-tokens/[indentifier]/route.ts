
import db from "@/lib/prisma";


export async function GET(request: Request, { params }: { params: {identifier: string} }) {
    
    const tokenIdentifier = params.identifier
    const verificationToken = await db.verificationToken.findFirst({
        where: {
            identifier: tokenIdentifier
        }
    })
    
    if(!tokenIdentifier) {
        return Response.json(false)
    }
    return Response.json(verificationToken)
}