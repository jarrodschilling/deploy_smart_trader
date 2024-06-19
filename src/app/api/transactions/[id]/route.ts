import { NextResponse } from "next/server";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";



export async function GET(request: Request, { params }: { params: {id: string} }) {
    // console.log(req)
    const transactionId = params.id
    // console.log(transactionId)

    const transaction = await db.transaction.findUnique({
        where: {
            id: transactionId,
        },
    })

    return Response.json(transaction)
    // return NextResponse.json(
    //     {
    //         success: true,
    //         message: "One Transaction",
    //         data: transaction
    //     },
    //     {
    //         status: 200,
    //     }
    // )
}

export async function DELETE(request: Request, { params }: { params: {id: string} }) {
    // console.log(req)
    const transactionId = params.id
    console.log(transactionId)

    const transaction = await db.transaction.delete({
        where: {
            id: transactionId,
        },
    })
    revalidatePath("transactions")
    return Response.json(transaction)
    // return NextResponse.json(
    //     {
    //         success: true,
    //         message: "One Transaction",
    //         data: transaction
    //     },
    //     {
    //         status: 200,
    //     }
    // )
}