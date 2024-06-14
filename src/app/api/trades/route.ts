import { NextResponse } from "next/server";
import db from "@/lib/prisma";


export async function GET(req: any) {
    console.log(req)
    const users = await db.trade.findMany()

    return NextResponse.json(
        {
            success: true,
            message: "List all trades",
            data: users
        },
        {
            status: 200,
        }
    )
}


export async function POST(request: Request) {
    const trade = await request.json()
    const newTrade = {
        ticker: trade.ticker,
        name: trade.name,
        date: trade.date,
        buySell: trade.buySell,
        shares: trade.shares,
        price: trade.price,
        shaper: trade.shaper,
        tactical: trade.tactical,
        closeTrade: trade.closeTrade,
        openTrade: trade.openTrade,
        userId: trade.userId,
    }
    await db.trade.create({
        data: newTrade
    })

    return NextResponse.json(
        {
            success: true,
            message: 'Trade added successfully!',
            data: newTrade,
        },
        { 
            status: 201,
        },
    );
}