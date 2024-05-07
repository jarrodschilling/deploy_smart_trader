import getAllUsers from "@/lib/getAllUsers"
import Link from "next/link"


export default async function Users() {
    const usersData: Promise<User[]> = getAllUsers()

    const users = await usersData

    console.log("Hello")

    const content = (
        <section>
            <h2>
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
