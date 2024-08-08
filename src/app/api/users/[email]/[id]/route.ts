import { NextResponse } from "next/server";
import db from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: {data: any, id: string} }) {
    // console.log(req)
    const userId = params.id
    const user = await request.json()
    const updatedUser = {
        name: user.name,
        email: user.email,
        password: user.password,
    }
    const updateUser = await db.toDo.update({
        where: {
            id: userId,
        },
        data: updatedUser
    })
    
    return Response.json(updateUser)
}