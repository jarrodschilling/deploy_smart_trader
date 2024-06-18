import { NextResponse } from "next/server";
import db from "@/lib/prisma";


export async function GET(req: any) {
    // console.log(req)
    const transactions = await db.transaction.findMany()

    return NextResponse.json(
        {
            success: true,
            message: "List all transactions",
            data: transactions
        },
        {
            status: 200,
        }
    )
}


export async function POST(request: Request) {
    const transaction = await request.json()
    const newTransaction = {
        ticker: transaction.ticker,
        name: transaction.name,
        date: transaction.date,
        buySell: transaction.buySell,
        shares: transaction.shares,
        price: transaction.price,
        shaper: transaction.shaper,
        tactical: transaction.tactical,
        closeTrade: transaction.closeTrade,
        openTrade: transaction.openTrade,
        userId: transaction.userId,
    }
    await db.transaction.create({
        data: newTransaction
    })

    return NextResponse.json(
        {
            success: true,
            message: 'Transaction added successfully!',
            data: newTransaction,
        },
        { 
            status: 201,
        },
    );
}

