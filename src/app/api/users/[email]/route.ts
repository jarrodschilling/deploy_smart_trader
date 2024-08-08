import { NextResponse } from "next/server";
import db from "@/lib/prisma";


export async function GET(request: Request, { params }: { params: {email: string} }) {
    // console.log(`route.ts: ${request}`)
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

export async function PUT(request: Request, { params }: { params: {email: string} }) {
    // console.log(req)
    const userEmail = params.email
    const user = await request.json()
    const updatedUser = {
        name: user.name,
        email: user.email,
        password: user.password,
    }
    const updateToDo = await db.toDo.update({
        where: {
            email: userEmail,
        },
        data: updatedUser
    })
    
    return Response.json(toDo)
}