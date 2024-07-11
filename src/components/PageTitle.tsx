import React from 'react'

export default function PageTitle({ title }: { title:string }) {
  return (
    <h1 className="text-gray-400 font-mono font-extrabold text-3xl mb-6">{title}</h1>
  )
}
