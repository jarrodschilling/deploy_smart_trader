'use client'

import TradeStatsCalcs from "./components/TradeStatsCalcs"
import { dateChanger, formatedCost, 
  formatedPercent, formatedPrice } from "@/lib/formatFunctions"

import { avgClosePrice, avgOpenPrice, gainLoss, getCloseDate, getOpenDate, getOwnedShares, 
  openTradeTrue, percentGainLoss, totalCost, totalSold } from "@/lib/tradeStatFunctions"

import groupTrades from "@/lib/groupTrades"
import GetAllTransactions from "@/services/getAllTransactions"
import { useEffect, useState } from "react"



export default function TradeStatistics() {
  const [trades, setTrades] = useState<Transaction[][]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const portfolio = 1000000

  useEffect (() => {
    const fetchTransactions = async () => {
      setIsLoading(true)
      try {
        const response = await GetAllTransactions()
        const transGroup = groupTrades(response)
        setTrades(transGroup)
      } catch(error) {
        console.log("Error:", error)
        setError("Failed to load transactions, please reload the page")
      } finally {
        setIsLoading(false)
      }
    };
    fetchTransactions()
  }, [])


  return (
    <>
        <h1>Trade Statistics</h1>
        <TradeStatsCalcs />
        <table>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Name</th>
              <th>Open Date</th>
              <th>Close Date</th>
              <th>Avg Open Price</th>
              <th>Shares</th>
              <th>Open Cost</th>
              <th>Close Price</th>
              <th>Close Value</th>
              <th>Gain/Loss</th>
              <th>Gain/Loss %</th>
              <th>Portfolio P/L</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
              {
                trades
                .sort((a, b) => new Date(a[0].date).getTime() - new Date(b[0].date).getTime())
                .map((trade: Transaction[], index: number) => (
                    <tr key={index} className={`${(openTradeTrue(trade) === false)? '':(gainLoss(trade)>0)? 'ledgerBuy': 'ledgerSell'}`}>
                        <td>{trade[0].ticker}</td>
                        <td>{trade[0].name}</td>
                        <td>{dateChanger(getOpenDate(trade))}</td>
                        <td>{dateChanger(getCloseDate(trade))}</td>
                        <td className={`${(openTradeTrue(trade) === false)? 'hidden': ''}`}>{formatedPrice(avgOpenPrice(trade))}</td>
                        <td className={`${(openTradeTrue(trade) === false)? 'hidden': ''}`}>{getOwnedShares(trade)}</td>
                        <td className={`${(openTradeTrue(trade) === false)? 'hidden': ''}`}>{formatedCost(totalCost(trade))}</td>
                        <td className={`${(openTradeTrue(trade) === false)? 'hidden': ''}`}>{formatedPrice(avgClosePrice(trade))}</td>
                        <td className={`${(openTradeTrue(trade) === false)? 'hidden': ''}`}>{formatedCost(totalSold(trade))}</td>
                        <td className={`${(openTradeTrue(trade) === false)? 'hidden': ''}`}>{formatedCost(gainLoss(trade))}</td>
                        <td className={`${(openTradeTrue(trade) === false)? 'hidden': ''}`}>{formatedPercent(percentGainLoss(trade))}</td>
                        <td className={`${(openTradeTrue(trade) === false)? 'hidden': ''}`}>{formatedPercent(gainLoss(trade)/(portfolio)*100)}</td>
                        
                        {/* <td><button className="editDeleteBtn" onClick={()=>detailsHandler(trade)}>Details</button></td> */}
                    </tr>
                  )
              )}
          </tbody>
      </table>
    </>
  )
}
