import { NextResponse } from "next/server";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function DELETE(request: Request, { params }: { params: {id: string} }) {
    
    const userId = params.id
    
    const transactions = await db.transaction.deleteMany({
        where: {
            userId: userId,
        },
    })
    revalidatePath("transactions")
    return Response.json(transactions)
}