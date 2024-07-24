import React from 'react'
import LoginRegisterButton from './LoginRegisterButton'

export default function HomePageTitleBar() {
  const title = "Welcome to Trade Stats Pro"

  return (
    <div className='flex justify-center m-1 mb-2'>
        <div>
            <h1 className="text-gray-400 font-bold text-4xl mb-1">
                {title.toUpperCase()}
            </h1>
            <h2 className='mb-6 text-center font-bold overline decoration-gray-400'>
                Take back control of your trading
            </h2>
        </div>
        <div>  
        </div>
    </div>
  )
}
