import GetUserByEmail from '@/services/getUserByEmail'
import React from 'react'

export default async function EquityCurve() {
  const userEmail = await GetUserByEmail("jocko")

  return (
    <div>EquityCurve</div>
  )
}
