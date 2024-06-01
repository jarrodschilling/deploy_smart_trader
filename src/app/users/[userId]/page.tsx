import getUser from "@/lib/getUser"
import getUserTransactions from "@/lib/getUserTransactions"
import { Suspense } from "react"
import UserTransactions from "./components/UserTransactions"
import type { Metadata } from "next"

type Params = {
    params: {
        userId: string
    }
}

export async function generateMetaData({ params: { userId } }:
Params): Promise<Metadata> {
    const userData: Promise<User> = getUser(userId)
    const user: User = await userData

    return {
        title: user.name,
        description: `This is the page of ${user.name}`
    }
}

export default async function UserPage({ params: { userId }}: Params) {
    const userData: Promise<User> = getUser(userId)
    const userTransactionsData: Promise<Transaction[]> = getUserTransactions(userId)
    
    // const [user, userPosts] = await Promise.all([userData, userTransactionsData])

    const user = await userData

    return (
        <>
            <h2>{user.name}</h2>
            <br />
            <Suspense fallback={<h2>loading...</h2>}>
                <UserTransactions promise={userTransactionsData} />
            </Suspense>
        </>
    )
}
