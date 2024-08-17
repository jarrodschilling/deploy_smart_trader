import bcrypt from "bcrypt"
import { NextResponse } from "next/server";
import db from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";


export async function GET(request: Request, { params }: { params: {email: string} }) {
    
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


export async function POST(request: Request) {
    const user = await request.json()

    const exist = await db.user.findUnique({
        where: {
            email: user.email
        }
    })

    if(exist) {
        throw new Error('email already exists')
    }
    
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const lowercaseEmail = user.email.toLowerCase()

    const newUser = {
        name: user.name,
        email: lowercaseEmail,
        password: hashedPassword,
    }
    
    const verificationToken = await generateVerificationToken(newUser.email)

    await sendVerificationEmail(newUser.email, verificationToken.data.token)

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
