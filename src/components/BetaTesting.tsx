import React from 'react'
import LoginRegisterButton from './LoginRegisterButton'

export default function BetaTesting() {
  const title = "Beta Testing Mode"

  return (
    <div className='flex justify-center bg-red-400 py-4 mx-14 mt-3 mb-2 border'>
        <div>
            <h1 className="text-white font-bold text-4xl mb-1 text-center">
                {title.toUpperCase()}
            </h1>
            <h2 className='text-center text-xl font-bold overline decoration-gray-400'>
                Database will be completely removed prior to official launch
            </h2>
        </div>
        <div>  
        </div>
    </div>
  )
}
