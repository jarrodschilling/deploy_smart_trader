import React from 'react'
import styles from './styles.module.css'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Smart Trader | About',
  description: '...',
}

export default function AboutLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
    <>
        <nav>About NavBar</nav>
        <main className={styles.main}>
            {children}
        </main>
    </>
  )
}
