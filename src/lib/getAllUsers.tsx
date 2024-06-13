import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

export default async function getAllUsers() {
    // const res = await fetch('https://jsonplaceholder.typicode.com/users')
    // if (!res.ok) throw new Error("failed to fetch data")
    // return res.json()

    const res = await db.user.findMany()

    if (!res) throw new Error("failed to fetch data")
    
    return res
}
