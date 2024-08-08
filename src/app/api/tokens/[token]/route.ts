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
