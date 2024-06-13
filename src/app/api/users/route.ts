// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import db from "@/lib/prisma";

// const db = new PrismaClient()

export async function GET() {
    const users = await db.user.findMany()

    return NextResponse.json(
        {
            success: true,
            message: "List all users",
            data: users
        },
        {
            status: 200,
        }
    )
}


export async function POST(request: Request) {
    const user = await request.json()
    const newUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userName: user.userName,
        password: user.password,
    }
    await db.user.create({
        data: newUser
    })

    return NextResponse.json(
        {
            success: true,
            message: 'User created successfully!',
            data: newUser,
        },
        { 
            status: 201,
        },
    );
}


// export async function POST(request: Request) {
//     const user = await request.json()
//     const newUser = {
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         userName: user.userName,
//         password: user.password,
//     }
//     await db.user.create({
//         data: newUser
//     })

//     return new Response(JSON.stringify(newUser), {
//         headers: {
//             "Content-Type": "application/json",
//         },
//         status: 201,
//     })
// }
