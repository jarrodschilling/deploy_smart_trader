import Link from "next/link"
import type { Metadata } from 'next'
import { getServerSession } from "next-auth"
import GetAllUsers from "@/services/getAllUsers"
import RegisterForm from "./components/RegisterForm"

export const metadata: Metadata = {
    title: 'Smart Trader | Users',   
}


export default async function UsersPage() {
    const usersData: Promise<FetchedUsersData> = GetAllUsers()
    const users = (await usersData).data

    const session = await getServerSession()
    // console.log(users[0].trades)

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
                    {user.transactions.map((transaction: Transaction) => (
                        <p key={transaction.id}>
                            <p>{transaction.name}</p>
                            <p>{transaction.ticker}</p>
                            <p>{transaction.shares}</p>
                            <p>{transaction.price}</p>
                            <p>{transaction.date}</p>
                        </p>
                    ))}
                </p>
            )
            )}
            <br />
            <RegisterForm />
        </section>
    )
    
    return(
        content
    )
}
