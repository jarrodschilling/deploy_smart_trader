import React from 'react'
import Image from 'next/image'

export default function AboutApp() {
  return (
    <div className="flex-col justify-between">
        <div className="text-center bg-slate-800 text-white rounded-md p-6 mb-12">
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
          <div className="border-1 border-slate-200 bg-slate-700 text-slate-300 rounded-md w-3/4 p-6 mb-12">
              <iframe 
                src="https://www.youtube.com/embed/3LGQEPpsngs"
                width="800"
                height="400"
                allowFullScreen
                className='aspect-video w-full h-full'
                
              ></iframe>
            </div>
        </div>
        <div className="text-center bg-slate-800 text-slate-300 rounded-md p-6 mb-12">
          <p>
            No longer do you need to depend on multiple platforms to track and manage historical
            trading records. Simply upload your trades with an Excel file and let Trade Stats
            Pro do the rest.
          </p>
        </div>

        <div className="text-center bg-slate-800 text-slate-300 rounded-md p-6 mb-12">
          {/* <img src="/about/trade_stats_statistics.png" alt=""></img> */}
          <Image 
            src="/about/trade_stats_statistics_2.png"
            alt="trade_stats_statistics"
            height={374}
            width={1102}
          />
        </div>
        <div className="text-center bg-slate-800 text-slate-300 rounded-md p-6 mb-12">
          <p>
            Now with more advanced ways than ever before to drill down into the details of every
            trade. Are you someone who normally trades around core positions? With TRADE STATS PRO
            you can now see exactly what the overall return was on all the transactions combined for that
            trade.
          </p>
        </div>
        <div className="text-center bg-slate-800 text-slate-300 rounded-md p-6 mb-12">
          <Image 
            src="/about/trade_stats_details.png"
            alt="trade_stats_details"
            height={374}
            width={1102}
          />
        </div>
        <div className="text-center bg-slate-800 text-slate-300 rounded-md p-6 mb-12">
          <p>
            Prepare for the day ahead with a customizable Trade Sheet for trades you want
            to take. Sorted by distance from trigger price and easily added to your transactions
            with a few clicks of a button once they execute on your preferred brokerage platform.
            No longer do you have to be in the
            dark about what the trading day ahead looks like.
          </p>
        </div>
        <div className="text-center bg-slate-800 rounded-md p-6 mb-12">
          <Image 
            src="/about/trade_stats_todo.png"
            alt="trade_stats_todo"
            height={374}
            width={1102}
          />
        </div>
        <div className="text-center bg-slate-800 rounded-md p-6 mb-12">
          <Image 
            src="/about/trade_stats_transactions.png"
            alt="trade_stats_transactions"
            height={374}
            width={1102}
          />
        </div>
    </div>
  )
}
