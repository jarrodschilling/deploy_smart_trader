import Link from "next/link"
import type { Metadata } from 'next'
import { getServerSession } from "next-auth"
import GetAllUsers from "@/services/getAllUsers"

export const metadata: Metadata = {
    title: 'Smart Trader | Users',   
}


export default async function UsersPage() {
    const usersData = await GetAllUsers()
    const users = await usersData.data

    const session = await getServerSession()
    // console.log(users[0].trades[0].ticker)

    const content = (
        <section>
            <h2>
                {session?.user?.name}
                <Link href="/">Back to HOME</Link>
            </h2>
            <br />
            {users.map((user: User) => (
                <p key={user.id}>
                    <h2>{user.firstName}</h2>
                    {user.trades.map((trade: Trade) => (
                        <p key={trade.id}>
                            <p>{trade.name}</p>
                            <p>{trade.ticker}</p>
                            <p>{trade.shares}</p>
                            <p>{trade.price}</p>
                            <p>{trade.date}</p>
                        </p>
                    ))}
                </p>
            )
        )}
        </section>
    )
    
    return(
        content
    )
}
