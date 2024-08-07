import { NextResponse } from "next/server";
import db from "@/lib/prisma";


export async function GET(request: Request, { params }: { params: {token: string} }) {
    // console.log(`route.ts: ${request}`)
    const tokenIdentifier = params.token
    const verificationToken = await db.verificationToken.findFirst({
        where: {
            token: tokenIdentifier
        }
    })

    return Response.json(verificationToken)
}


// export async function DELETE(request: Request, { params }: { params: {token: string} }) {
//     // console.log(req)
//     const tokenToken = params.token

//     const token = await db.verificationToken.delete({
//         where: {
//             identifier: tokenToken,
//         },
//     })
//     return Response.json(token)
// }