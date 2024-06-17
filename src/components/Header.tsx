import Link from "next/link"

export default function Header() {
  return (
    <>
      <h1>NavBar</h1>
      <Link href="/dashboard">Home | </Link>
      <Link href="/current-portfolio">Portfolio | </Link>
      <Link href="/users">Users | </Link>
      <Link href="/trade-statistics">Trade Stats | </Link>
      <Link href="/transactions">Transactions</Link>
    </>
  )
}
