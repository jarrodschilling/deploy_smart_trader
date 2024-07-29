import { NextResponse } from "next/server";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function GET(request: Request, { params }: { params: {id: string} }) {
    // console.log(req)
    const toDoId = params.id
    // console.log(toDoId)

    const toDo = await db.toDo.findUnique({
        where: {
            id: toDoId,
        },
    })
    
    return NextResponse.json(
        {
            success: true,
            message: "One To Do",
            data: toDo
        },
        {
            status: 200,
        }
    )
}

export async function DELETE(request: Request, { params }: { params: {id: string} }) {
    // console.log(req)
    const toDoId = params.id
    console.log(toDoId)

    const toDo = await db.toDo.delete({
        where: {
            id: toDoId,
        },
    })
    revalidatePath("toDos")
    return Response.json(toDo)

}

export async function PUT(request: Request, { params }: { params: {id: string} }) {
    // console.log(req)
    const toDoId = params.id
    const toDo = await request.json()
    const updatedToDo = {
        ticker: toDo.ticker,
        name: toDo.name,
        date: toDo.date,
        buySell: toDo.buySell,
        shares: toDo.shares,
        price: toDo.price,
        shaper: toDo.shaper,
        tactical: toDo.tactical,
        closeTrade: toDo.closeTrade,
        openTrade: toDo.openTrade,
        updateStop: toDo.updateStop,
        quickAction: toDo.quickAction,
        entered: toDo.entered,
        userId: toDo.userId,
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


export async function PATCH(request: Request, { params }: { params: {id: string} }) {
    // console.log(req)
    const toDoId = params.id
    const toDo = await request.json()
    const updatedToDo = {
        ticker: toDo.ticker,
        name: toDo.name,
        date: toDo.date,
        buySell: toDo.buySell,
        shares: toDo.shares,
        price: toDo.price,
        shaper: toDo.shaper,
        tactical: toDo.tactical,
        closeTrade: toDo.closeTrade,
        openTrade: toDo.openTrade,
        updateStop: toDo.updateStop,
        quickAction: toDo.quickAction,
        entered: toDo.entered,
        userId: toDo.userId,
    }
    const updateToDo = await db.toDo.update({
        where: {
            id: toDoId,
        },
        data: updatedToDo
    })
    
    revalidatePath("toDos")
    return Response.json(updateToDo)
}