import React from 'react'
import styles from './styles.module.css'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Smart Trader | Users',
  description: '...',
}

export default function UsersLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
    <>
        <nav>Users NavBar</nav>
        <main className={styles.main}>
            {children}
        </main>
    </>
  )
}
