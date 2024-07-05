import GetUserByEmail from '@/services/getUserByEmail'
import React from 'react'

export default async function EquityCurve() {
  const userEmail = await GetUserByEmail("jarrodschilling@gmail.com")
  console.log(userEmail)
  return (
    <div>EquityCurve</div>
  )
}
