import React from 'react'

export default function AboutApp() {
  return (
    <div className="flex-col justify-between">
        <div className="border-2 border-slate-200 bg-black rounded-md w-3/4 p-6 mb-4">
          <p>
            Trade Stats Pro empowers traders to track their trading account statistics in an
            accurate and timely fasion. It allows for individual historical trade analysis, putting
            traders in the driver seat to imporve their trading process by targeting inefficiences
            in their trading system.
          </p>
        </div>
        <div className="border-2 border-slate-200 bg-black rounded-md w-3/4 p-6">
          <img src="" alt="" />
        </div>
        <div className="border-2 border-slate-200 bg-black rounded-md w-3/4 p-6">
          <p>
            No longer do you need to depend on multiple platforms to track and manage historical
            trading records. Simply upload your trades with an Excel file and let Trade Stats
            Pro to the rest.
          </p>
        </div>
    </div>
  )
}
