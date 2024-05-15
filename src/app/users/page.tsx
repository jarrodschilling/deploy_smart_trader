import getAllUsers from "@/lib/getAllUsers"
import Link from "next/link"
import type { Metadata } from 'next'
import { getServerSession } from "next-auth"

export const metadata: Metadata = {
    title: 'Smart Trader | Users',   
}


export default async function UsersPage() {
    const usersData: Promise<User[]> = getAllUsers()

    const users = await usersData
    const session = await getServerSession()

    console.log("Hello")

    const content = (
        <section>
            <h2>
                {session?.user?.name}
                <Link href="/">Back to HOME</Link>
            </h2>
            <br />
            {users.map(user => {
                return(
                    <>
                        <p key={user.id}>
                            <Link href={`/users/${user.id}`}>{user.name}</Link>
                        </p>
                        <br />
                    </>
                )
            })}
        </section>
    )
    
    return content
}
