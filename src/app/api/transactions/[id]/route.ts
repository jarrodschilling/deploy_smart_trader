import { NextResponse } from "next/server";
import db from "@/lib/prisma";

type Params = {
    params: {
        transactionId: string
    }
}

export async function GET(request: Request, { params }: { params: {id: string} }) {
    // console.log(req)
    const transactionId = params.id
    console.log(transactionId)

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

// export async function DELETE(req: any) {
//     // console.log(req)
//     const transactions = await db.transaction.delete(id)

//     return NextResponse.json(
//         {
//             success: true,
//             message: "List all transactions",
//             data: transactions
//         },
//         {
//             status: 200,
//         }
//     )
// }