import React from 'react'
import LoginRegisterButton from './LoginRegisterButton'

export default function HomePageTitleBar() {
  const title = "Welcome"

  return (
    <div className='flex justify-center m-1 mb-2'>
        <div>
            <h1 className="text-gray-400 font-bold text-4xl mb-1 text-center">
                {title.toUpperCase()}
                {/* WELCOME<br/>TO<br/>TRADE STATS PRO */}
            </h1>
            <h2 className='mb-12 text-center font-bold overline decoration-gray-400'>
                Take back control of your trading system
            </h2>
        </div>
        <div>  
        </div>
    </div>
  )
}
