import db from "@/lib/prisma";


export async function DELETE(request: Request, { params }: { params: {id: string} }) {
    
    const accountId = params.id
    

    const account = await db.account.delete({
        where: {
            userId: accountId,
        },
    })
    
    return Response.json(account)

}

export async function GET(request: Request, { params }: { params: {id: string} }) {
    
    const userId = params.id
    const account = await db.account.findUnique({
        where: {
            userId: userId
        },
    })

    return Response.json(account)
}