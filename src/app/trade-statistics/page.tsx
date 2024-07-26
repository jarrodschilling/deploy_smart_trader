'use client'


import { GroupedTrades, TradeStatsHeaderType, Transaction } from "../../../types"
import { dateChanger, formatedCost, 
  formatedPercent, formatedPrice } from "@/lib/formatFunctions"

import { avgClosePrice, avgOpenPrice, gainLoss, getCloseDate, getOpenDate, getOwnedShares, 
  openTradeTrue, percentGainLoss, totalCost, totalSold } from "@/lib/tradeStatFunctions"

import groupTrades from "@/lib/groupTrades"
import GetAllTransactions from "@/services/getAllTransactions"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import GetUserByEmail from "@/services/getUserByEmail"
import PageTitle from "@/components/PageTitle"
import Link from "next/link"
import TradeStatsHeader from "./components/TradeStatsHeader"
import { avgDollarWinLoss, avgPctWinLoss, avgPortWinLoss, battingAvg, clearOpenTrades, realizedGainLoss, totalDollarPL, totalPctPL } from "@/lib/PortStatsFunctions"
import getStockPrices from "@/services/yahoo/getStockPrices"
import { currentGainLoss, currentOpenCost, currentValue } from "@/lib/currentPortfolioCalcs"



export default function TradeStatistics() {
  const [highlight, setHighlight] = useState<string>("false")
  const [onColors, setOnColors] = useState<string>("true")
  const [trades, setTrades] = useState<Transaction[][]>([])
  const [openTrades, setOpenTrades] = useState<Transaction[][]>([])
  const [stockPrices, setStockPrices] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { data: session, status } = useSession()

  const portfolio = 1000000

  useEffect (() => {
    const fetchTransactions = async () => {
      setIsLoading(true)
      try {
        const userEmail = session?.user?.email
        const response = await GetUserByEmail(userEmail)
        // const response = await GetAllTransactions()
        const transGroup = groupTrades(response.transactions)
        setTrades(transGroup)
        let newTrades = transGroup
        let openTradesArray = []
        for (let i = 0; i < newTrades.length; i++) {
          if (openTradeTrue(newTrades[i]) === false) {
            openTradesArray.push(newTrades[i])
          }
        }
        setOpenTrades(openTradesArray)
      } catch(error) {
        console.log("Error:", error)
        setError("Failed to load transactions, please reload the page")
      } finally {
        setIsLoading(false)
      }
    };
    fetchTransactions()
  }, [])

  useEffect(() => {
    const fetchStockPrices = async () => {
      setIsLoading(true);
      try {
        const promises = openTrades.map(async (trade) => {
          const symbol = trade[0].ticker;
          const response = await getStockPrices(symbol);
          const stockPrice = response.chart.result[0].meta.regularMarketPrice;
          return { symbol, stockPrice };
        });
        const prices = await Promise.all(promises);
        const priceMap = prices.reduce((acc, { symbol, stockPrice }) => {
          acc[symbol] = stockPrice;
          return acc;
        }, {} as Record<string, number>);
        setStockPrices(priceMap);
      } catch (error) {
        console.error("Error fetching stock prices", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (openTrades.length > 0) {
      fetchStockPrices();
    }
  }, [openTrades]);

  function unrealizedPL (openTrades: GroupedTrades[]) {
    let cost = 0
    let curValue = 0
    let unrlzPL = 0
    let unrlzPLPct = 0
    for (let i = 0; i < openTrades.length; i++) {
        const symbol = openTrades[i][0].ticker
        const price = stockPrices[symbol]
        cost += currentOpenCost(openTrades[i])
        curValue += currentValue(price, openTrades[i])
        unrlzPL += currentGainLoss(price, openTrades[i])
    }
    return { cost, curValue, unrlzPL }
}
  let unRlzGainLoss = (unrealizedPL(openTrades).unrlzPL)
  // Trade Stats Header Calcs
  let updatedTrades = clearOpenTrades(trades)
  let winPct = formatedPercent(battingAvg(updatedTrades).winPct)
  let lossPct = formatedPercent(battingAvg(updatedTrades).lossPct)
  let avgWinUSD = formatedCost(avgDollarWinLoss(updatedTrades).finalWin)
  let avgLossUSD = formatedCost(avgDollarWinLoss(updatedTrades).finalLoss)
  let avgWinPct = formatedPercent(avgPctWinLoss(updatedTrades).finalWin)
  let avgLossPct = formatedPercent(avgPctWinLoss(updatedTrades).finalLoss)
  let avgPortWin = formatedPercent(avgPortWinLoss(updatedTrades).finalWin)
  let avgPortLoss = formatedPercent(avgPortWinLoss(updatedTrades).finalLoss)
  let rlzGainLoss = realizedGainLoss(updatedTrades)
  let totalPL = totalDollarPL(rlzGainLoss, unRlzGainLoss)
  let totalPLPct = totalPctPL(portfolio, totalPL)

  const tradeStats: TradeStatsHeaderType = {
    winPercent: winPct,
    lossPercent: lossPct,
    avgWinUSD: avgWinUSD,
    avgLossUSD: avgLossUSD,
    avgWinPercent: avgWinPct,
    avgLossPercent: avgLossPct,
    avgPortWin: avgPortWin,
    avgPortLoss: avgPortLoss,
    rlzGainLoss: rlzGainLoss,
    unRlzGainLoss: unRlzGainLoss,
    totalPL: totalPL,
    totalPLPercent: totalPLPct,
  }

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
    <div className='m-4 mt-20'>
      <PageTitle title={"Trade Statistics"} />
        <TradeStatsHeader tradeStats={tradeStats} />
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
                      (openTradeTrue(trade) === false && highlight === "false")? 'border-b border-slate-600':
                      (openTradeTrue(trade) === false && highlight === "true")? 'border-b border-slate-600 hover:bg-blue-400':
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
