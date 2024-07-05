import { NextResponse } from "next/server";
import db from "@/lib/prisma";


export async function GET(request: Request, { params }: { params: {email: string} }) {
    console.log(`route.ts: ${request}`)
    const userEmail = params.email
    const user = await db.user.findUnique({
        where: {
            email: userEmail
        },
        // include: {
        //     transactions: true
        // }
    })

    return Response.json(user)
}