import { NextResponse } from "next/server";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PATCH(request: Request, { params }: { params: {id: string} }) {
    // console.log(req)
    const toDoId = params.id
    const toDo = await request.json()
    const updatedToDo = {
        quickAction: toDo.quickAction,
    }
    const updateToDo = await db.toDo.update({
        where: {
            id: toDoId,
        },
        data: updatedToDo
    })
    
    revalidatePath("toDos")
    return Response.json(toDo)
}