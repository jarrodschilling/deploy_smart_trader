import React from 'react'
import styles from './styles.module.css'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'


// export const metadata: Metadata = {
//   title: 'Smart Trader | Users',
//   description: '...',
// }

export default async function UsersLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const session = await getServerSession()
    if (!session || !session.user) {
        redirect("/api/auth/signin")
    }

    return (
    <>
        <nav>Users NavBar</nav>
        <main className={styles.main}>
            {children}
        </main>
    </>
  )
}
