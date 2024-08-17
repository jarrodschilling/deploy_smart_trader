import React from 'react'

export default function PageTitle({ title }: { title:string }) {
  return (
    <div className='flex justify-center'>
    <h1 className="text-gray-400 font-bold text-4xl mb-6 mt-2">{title.toUpperCase()}</h1>
    </div>
  )
}
