import { NextResponse } from "next/server";
import db from "@/lib/prisma";


export async function POST(request: Request) {
    const verificationToken = await request.json()
    const newVerificationToken = {
        identifier: verificationToken.identifier,
        token: verificationToken.token,
        expires: verificationToken.expires,
    }
    await db.verificationToken.create({
        data: newVerificationToken
    })

    return NextResponse.json(
        {
            success: true,
            message: 'Verification Token created successfully!',
            data: newVerificationToken,
        },
        { 
            status: 201,
        },
    );
}

