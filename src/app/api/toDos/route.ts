import { NextResponse } from "next/server";
import db from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req: any) {
    const toDos = await db.toDo.findMany()
    // const session = await getServerSession(authOptions)
    // // console.log(session)
    // if (!session) {
    //     return Response.error()
    // }

    return Response.json(toDos)
}


export async function POST(request: Request) {
    const toDo = await request.json()
    const newToDo = {
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
        userId: toDo.userId,
    }
    await db.toDo.create({
        data: newToDo
    })

    return NextResponse.json(
        {
            success: true,
            message: 'To Do added successfully!',
            data: newToDo,
        },
        { 
            status: 201,
        },
    );
}

