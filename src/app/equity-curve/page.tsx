"use client"
import GetUserByEmail from '@/services/getUserByEmail'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { useSession } from 'next-auth/react'

export default function EquityCurve() {
  // const userEmail = await GetUserByEmail("jarrodschilling@gmail.com")
  // const session = await getServerSession(authOptions)
  const session = useSession()
  // console.log(userEmail)
  return (
    <section>
      <br />
      <br />
      <br />
      <h1>TESTING</h1>
      <h1>Server Side Rendering</h1>
      <pre>{JSON.stringify(session)}</pre>
    </section>
  )
}
