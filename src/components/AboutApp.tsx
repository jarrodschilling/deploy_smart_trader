import React from 'react'

export default function AboutApp() {
  return (
    <div className="flex-col justify-between">
        <div className="text-center bg-slate-800 rounded-md p-6 mb-12">
          <p>
            Trade Stats Pro empowers traders to track their trading account statistics in an
            accurate and timely fashion. It allows for individual historical trade analysis, putting
            traders in the driver seat to improve their trading process by targeting inefficiencies
            in their trading system.
          </p>
          <p className='mt-4 text-center font-bold'>&#34;What gets measured gets managed&#34;</p>
          <p className='text-center'>- Peter Drucker</p>
        </div>
        <div className='flex justify-center'>
          <div className="border-1 border-slate-200 bg-slate-700 rounded-md w-3/4 p-6 mb-12">
              <iframe 
                src="https://www.youtube.com/embed/3LGQEPpsngs"
                width="800"
                height="400"
                allowFullScreen
                className='aspect-video w-full h-full'
                
              ></iframe>
            </div>
        </div>
        <div className="text-center bg-slate-800 rounded-md p-6 mb-12">
          <p>
            No longer do you need to depend on multiple platforms to track and manage historical
            trading records. Simply upload your trades with an Excel file and let Trade Stats
            Pro do the rest.
          </p>
        </div>

        <div className="text-center bg-slate-800 rounded-md p-6 mb-12">
          <img src="/about/trade_stats_statistics.png" alt=""></img>
        </div>
        <div className="text-center bg-slate-800 rounded-md p-6 mb-12">
          <img src="/about/trade_stats_transactions.png" alt=""></img>
        </div>
        <div className="text-center bg-slate-800 rounded-md p-6 mb-12">
          <p>
            Now with more advanced ways than ever before to drill down into the details of every
            trade. Are you someone who normally trades around core positions? With TRADE STATS PRO
            you can now see exactly what the overall return was on all the transactions combined for that
            trade.
          </p>
        </div>
        <div className="text-center bg-slate-800 rounded-md p-6 mb-12">
          <img src="/about/trade_stats_details.png" alt=""></img>
        </div>
    </div>
  )
}
