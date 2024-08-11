'use client'

import { dateChanger, formatedCost, formatedPercent, formatedPrice } from "@/lib/formatFunctions"
import { GroupedTrades } from "../../../../types"
import { clearOpenTrades, realizedGainLoss, totalDollarPL, totalPctPL } from "@/lib/PortStatsFunctions"
import { currentGainLoss, currentOpenCost, currentValue } from "@/lib/currentPortfolioCalcs"
import Link from "next/link"
import { avgClosePrice, avgOpenPrice, gainLoss, getCloseDate, getOpenDate, getOwnedShares, openTradeTrue, percentGainLoss, totalCost, totalSold } from "@/lib/tradeStatFunctions"
import { Transaction } from "@prisma/client"
import { useState } from "react"


interface Props {
  openTrades: Array<GroupedTrades>,
  closedTrades: Array<GroupedTrades>,
  allTrades: Array<GroupedTrades>,
  stockPrices: Record<string, number>,
  portfolioValue: number,
}

const TradeStatsComponent: React.FC<Props> = ({portfolioValue, closedTrades, openTrades, allTrades, stockPrices}) => {
  const [highlight, setHighlight] = useState<string>("false")
  const [onColors, setOnColors] = useState<string>("false")
  const [trades, setTrades] = useState<Transaction[][]>(allTrades)

  const portfolio = portfolioValue
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
    <>
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

        <div className="relative border-slate-600 border overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-200">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" className="px-2 py-4">Ticker</th>
              <th scope="col" className="px-0 py-4">Name</th>
              <th scope="col" className="px-0 py-4">Open Date</th>
              <th scope="col" className="px-0 py-4">Close Date</th>
              <th scope="col" className="px-0 py-4">Avg Open Price</th>
              <th scope="col" className="px-0 py-4">Shares</th>
              <th scope="col" className="px-0 py-4">Open Cost</th>
              <th scope="col" className="px-0 py-4">Close Price</th>
              <th scope="col" className="px-0 py-4">Close Value</th>
              <th scope="col" className="px-0 py-4">Gain/Loss</th>
              <th scope="col" className="px-0 py-4">Gain/Loss %</th>
              <th scope="col" className="px-0 py-4">Portfolio P/L</th>
              <th scope="col" className="px-0 py-4"></th>
            </tr>
          </thead>
          <tbody>
              {
                trades
                .sort((a, b) => new Date(a[0].date).getTime() - new Date(b[0].date).getTime())
                .map((trade: Transaction[], index: number) => (
                    <tr key={index} className={`${
                      (openTradeTrue(trade) === false)? 'border-b border-slate-600':
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
                        <td scope="col" className={`${(openTradeTrue(trade) === false)? 'hidden': 'px-0 py-2'}`}>{formatedPrice(avgOpenPrice(trade))}</td>
                        <td scope="col" className={`${(openTradeTrue(trade) === false)? 'hidden': 'px-0 py-2'}`}>{getOwnedShares(trade)}</td>
                        <td scope="col" className={`${(openTradeTrue(trade) === false)? 'hidden': 'px-0 py-2'}`}>{formatedCost(totalCost(trade))}</td>
                        <td scope="col" className={`${(openTradeTrue(trade) === false)? 'hidden': 'px-0 py-2'}`}>{formatedPrice(avgClosePrice(trade))}</td>
                        <td scope="col" className={`${(openTradeTrue(trade) === false)? 'hidden': 'px-0 py-2'}`}>{formatedCost(totalSold(trade))}</td>
                        <td scope="col" className={`${(openTradeTrue(trade) === false)? 'hidden': 'px-0 py-2'}`}>{formatedCost(gainLoss(trade))}</td>
                        <td scope="col" className={`${(openTradeTrue(trade) === false)? 'hidden': 'px-0 py-2'}`}>{formatedPercent(percentGainLoss(trade))}</td>
                        <td scope="col" className={`${(openTradeTrue(trade) === false)? 'hidden': 'px-0 py-2'}`}>{formatedPercent(gainLoss(trade)/(portfolio)*100)}</td>
                        {
                          openTradeTrue(trade) === false? <></>:
                          <td scope="col" className="px-0 py-2">
                          <button className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0 px-2 border border-blue-500 hover:border-transparent rounded-md">
                            <Link href={{
                              pathname: `/trade-statistics/details`,
                              query: {
                                tradeGroup: JSON.stringify(trade)
                              }}}>DETAILS</Link></button>
                          </td>
                        }
                        
                        {/* <td><button className="editDeleteBtn" onClick={()=>detailsHandler(trade)}>Details</button></td> */}
                    </tr>
                  )
              )}
          </tbody>
      </table>
      </div>
    </>
  )
}


export default TradeStatsComponent
