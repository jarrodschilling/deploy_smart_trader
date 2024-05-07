import Link from "next/link";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>This will be a landing page with about Smart Trader and Login/Reg</h1>
      <Link href="/about">Link to About Page</Link>
      <Link href="/users">Link to Users Page</Link>
    </main>
  );
}
