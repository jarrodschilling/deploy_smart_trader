'use client'

import { dateChanger, formatedCost, 
  formatedPercent, formatedPrice } from "@/lib/formatFunctions"
import { avgClosePrice, avgOpenPrice, gainLoss, getCloseDate, getOpenDate, getOwnedShares, 
  openTradeTrue, percentGainLoss, totalCost, totalSold } from "@/lib/tradeStatFunctions"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Transaction } from "@prisma/client"

interface Props {
  trades: Transaction[][],
  portfolio: number,
}

const MainComponent: React.FC<Props> = ({trades, portfolio}) =>  {
  const [highlight, setHighlight] = useState<string>("false")
  const [onColors, setOnColors] = useState<string>("true")

  const handleHighlight = async () => {
    if (highlight === "false") {
    setHighlight("true")
    }
    else {setHighlight('false')}
  }

  const handleOnColors = async () => {
    if (onColors === "false") {
    setOnColors("true")
    }
    else {setOnColors('false')}
  }

  return (
    <div className='m-4 mt-6'>
        <div className='justify-between flex m-1 mb-2'>
        <div></div>
        <br />
        <div>
        <button
          className={`${(highlight === "false")?'bg-white text-blue-500 font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2'
            :'bg-blue-500 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2'}`}
          onClick={handleHighlight}>Highlight</button>
        <button
          className={`${(onColors === "false")?'bg-white text-blue-500 font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2'
            :'bg-blue-500 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2'}`}
          onClick={handleOnColors}>Colors</button>
        </div>
        </div>

        <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg max-h-96 -mb-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-200">
          <thead className="sticky top-0 text-sm text-gray-300 uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" className="px-2 py-4">Ticker</th>
              <th scope="col" className="px-0 py-4">Name</th>
              <th scope="col" className="px-2 py-4">Open<br/>Date</th>
              <th scope="col" className="px-2 py-4">Close<br/>Date</th>
              <th scope="col" className="px-2 py-4">Avg Open<br/>Price</th>
              <th scope="col" className="px-2 py-4">Shares</th>
              <th scope="col" className="px-2 py-4">Open<br/>Cost</th>
              <th scope="col" className="px-2 py-4">Close<br/>Price</th>
              <th scope="col" className="px-2 py-4">Close<br/>Value</th>
              <th scope="col" className="text-center px-2 py-4">Gain/<br/>Loss</th>
              <th scope="col" className="text-center px-2 py-4">Gain/<br/>Loss %</th>
              <th scope="col" className="text-center px-1 py-4">Portfolio<br/>Impact</th>
              <th scope="col" className="text-center px-2 py-4"></th>
            </tr>
          </thead>
          <tbody>
              {
                trades
                .sort((a, b) => new Date(a[0].date).getTime() - new Date(b[0].date).getTime())
                .map((trade: Transaction[], index: number) => (
                    <tr key={index} className={`${
                      (openTradeTrue(trade) === false && highlight === "false")? 'bg-slate-200 text-slate-800 border-b dark:bg-slate-500 dark:border-gray-700 dark:border-b-white dark:text-white':
                      (openTradeTrue(trade) === false && highlight === "true")? 'bg-slate-200 text-slate-800 border-b dark:bg-slate-500 dark:border-gray-700 dark:border-b-white hover:bg-blue-400 dark:text-white':
                      (onColors === "false" && highlight === "false")? 'noColor':
                      (onColors === "false" && highlight === "true")? 'noColorHighLight':
                      (onColors === "true" && highlight === "false" && (gainLoss(trade))>0)? 'colorsBuy':
                      (onColors === "true" && highlight === "false" && (gainLoss(trade))<0)? 'colorsSell':
                      (onColors === "true" && highlight === "true" && (gainLoss(trade))>0)? 'colorsHighlightBuy':
                      'colorsHighlightSell'}`}>
                        <td scope="col" className="px-2 py-2">{trade[0].ticker}</td>
                        <td scope="col" className="px-0 py-2">{trade[0].name}</td>
                        <td scope="col" className="px-0 py-2">{dateChanger(getOpenDate(trade))}</td>
                        <td scope="col" className="px-0 py-2">{dateChanger(getCloseDate(trade))}</td>
                        <td scope="col" className={`${(openTradeTrue(trade) === false)? 'opacity-0': 'px-2 py-2'}`}>{formatedPrice(avgOpenPrice(trade))}</td>
                        <td scope="col" className={`${(openTradeTrue(trade) === false)? 'opacity-0': 'px-2 py-2'}`}>{getOwnedShares(trade)}</td>
                        <td scope="col" className={`${(openTradeTrue(trade) === false)? 'opacity-0': 'px-2 py-2'}`}>{formatedCost(totalCost(trade))}</td>
                        <td scope="col" className={`${(openTradeTrue(trade) === false)? 'opacity-0': 'px-2 py-2'}`}>{formatedPrice(avgClosePrice(trade))}</td>
                        <td scope="col" className={`${(openTradeTrue(trade) === false)? 'opacity-0': 'px-2 py-2'}`}>{formatedCost(totalSold(trade))}</td>
                        <td scope="col" className={`${(openTradeTrue(trade) === false)? 'opacity-0': 'text-center px-2 py-2'}`}>{formatedCost(gainLoss(trade))}</td>
                        <td scope="col" className={`${(openTradeTrue(trade) === false)? 'opacity-0': 'text-center px-2 py-2'}`}>{formatedPercent(percentGainLoss(trade))}</td>
                        <td scope="col" className={`${(openTradeTrue(trade) === false)? 'opacity-0': 'text-center px-2 py-2'}`}>{formatedPercent(gainLoss(trade)/(portfolio)*100)}</td>

                        <td scope="col" className="px-0 py-2">
                        <button className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0 px-2 border border-blue-500 hover:border-transparent rounded-md">
                          <Link href={{
                            pathname: `/trade-statistics/details`,
                            query: {
                              tradeGroup: JSON.stringify(trade)
                            }}}>DETAILS</Link></button>
                        </td>

                        
                        {/* <td><button className="editDeleteBtn" onClick={()=>detailsHandler(trade)}>Details</button></td> */}
                    </tr>
                  )
              )}
          </tbody>
      </table>
      </div>
    </div>
  )
}


export default MainComponent