
import db from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: {data: any, id: string} }) {
    
    const userId = params.id
    const user = await request.json()
    const updatedUser = {
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        password: user.password,
        portfolioValue: user.portfolioValue
    }
    
    const updateUser = await db.user.update({
        where: {
            id: userId,
        },
        data: updatedUser
    })
    
    return Response.json(updateUser)
}


export async function DELETE(request: Request, { params }: { params: {id: string} }) {
    
    const userId = params.id
    

    const user = await db.user.delete({
        where: {
            id: userId,
        },
    })

    return Response.json(user)

}