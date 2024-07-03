"use client"
import React from 'react'
import { useSession } from 'next-auth/react'

export default function TradeSheet() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
    <>
    <br />
    <br />
    <br />
    <br />
    <br />
    <p>Loading...</p>
    </>)
  }

  if (status === "unauthenticated") {
    return (
      <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <p>Access Denied</p>
      </>
    )
  }
  return (
    (
      <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>Trade Sheet Component</div>
    </>
    )
  )
}
