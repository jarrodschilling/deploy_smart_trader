
import db from "@/lib/prisma";


export async function GET(request: Request, { params }: { params: {email: string} }) {
    
    const userEmail = params.email
    const user = await db.user.findUnique({
        where: {
            email: userEmail
        },
        include: {
            transactions: true,
            toDos: true
        }
    })

    return Response.json(user)
}

