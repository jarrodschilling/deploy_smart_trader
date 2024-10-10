'use client'

import { dateChanger, totalCostFmt, formatedPrice, formatedCost, formatedPercent } from '@/lib/formatFunctions'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Transaction } from '@prisma/client'
import groupTrades from '@/lib/groupTrades'
import { avgOpenPrice, currentShares, gainLoss, getCloseDate, getOpenDate, openTradeTrue } from '@/lib/tradeStatFunctions'
import { currentGainLoss, currentOpenCost, currentValue } from '@/lib/currentPortfolioCalcs'
import getStockPrices from '@/services/yahoo/getStockPrices'
import { GroupedTrades } from '../../../../types'

interface Props {
  openTrades: Array<GroupedTrades>,
  stockPrices: Record<string, number>,
  portfolioValue: number,
}


const CurrentPortfolioComponent: React.FC<Props> = ({openTrades, stockPrices, portfolioValue}) =>  {
  const [highlight, setHighlight] = useState<string>("false")
  const [onColors, setOnColors] = useState<string>("true")
  const [isLoading, setIsLoading] = useState(true)
  const [sortedTransactions, setSortedTransactions] = useState<GroupedTrades[]>(openTrades)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { data: session, status } = useSession()
  const router = useRouter()

  const portfolio = portfolioValue

  useEffect(() => {
    if (!openTrades) return
    const sortedArray = [...openTrades].sort((a, b) => {
      return new Date(a[0].date).getTime() - new Date(b[0].date).getTime()
    })
    // @ts-ignore
    setSortedTransactions(sortedArray)
  }, [openTrades])

  const handleSort = (key: keyof Transaction) => {
    let direction = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    
    // @ts-ignore
    const sortedArray = [...openTrades].sort((a, b) => {
      const aValue = a[0][key] ?? ""
      const bValue = b[0][key] ?? ""
      
      if (aValue < bValue) return direction === "ascending" ? -1 : 1
      
      if (aValue > bValue) return direction === "ascending" ? 1 : -1
      return 0
    })

    setSortConfig({ key, direction })
    setSortedTransactions(sortedArray)
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
    <div className=''>
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
      {error && <p>{error}</p>}
      
      <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg max-h-96 -mb-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-200">
          <thead className="sticky top-0 text-sm text-gray-300 uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-300">
          <tr>
              <th scope="col" className="px-2 py-4">Ticker</th>
              <th scope="col" className="px-0 py-4">Name</th>
              <th scope="col" className="pr-2 pl-0 py-4 text-center">Open<br/>Date</th>
              <th scope="col" className="px-2 py-4 text-center">Avg Open<br/>Price</th>
              <th scope="col" className="px-2 py-4 text-center">Shares</th>
              <th scope="col" className="px-2 py-4 text-center">Open<br/>Cost</th>
              <th scope="col" className="px-2 py-4 text-center">Current<br/>Price</th>
              <th scope="col" className="px-2 py-4 text-center">Current<br/>Value</th>
              <th scope="col" className="px-2 py-4 text-center">Gain/<br/>Loss $</th>
              <th scope="col" className="px-2 py-4 text-center">Gain/<br/>Loss %</th>
              <th scope="col" className="px-2 py-4 text-center">Portfolio<br/>Impact</th>
              <th scope="col" className="px-2 py-1 text-center"></th>
          </tr>
        </thead>
        <tbody>
            {
              openTrades
              .sort((a, b) => new Date(a[0].date).getTime() - new Date(b[0].date).getTime())
              .map((trade: Transaction[], index: number) => { 
                  const symbol = trade[0].ticker
                  const price = stockPrices[symbol]
                  return (
                  <tr key={index} 
                  className={`${
                    (onColors === "false" && highlight === "false")? 'noColor':
                    (onColors === "false" && highlight === "true")? 'noColorHighLight':
                    (onColors === "true" && highlight === "false" && (currentGainLoss(price, trade))>0)? 'colorsBuy':
                    (onColors === "true" && highlight === "false" && (currentGainLoss(price, trade))<0)? 'colorsSell':
                    (onColors === "true" && highlight === "true" && (currentGainLoss(price, trade))>0)? 'colorsHighlightBuy':
                    'colorsHighlightSell'}`}>
                      <td scope="col" className="px-2 py-2">{trade[0].ticker}</td>
                      <td scope="col" className="px-0 py-2">{trade[0].name}</td>
                      <td scope="col" className="pr-2 pl-0 py-2 text-center">{dateChanger(getOpenDate(trade))}</td>
                      <td scope="col" className="px-2 py-2 text-center">{formatedPrice(avgOpenPrice(trade))}</td>
                      <td scope="col" className="px-2 py-2 text-center">{currentShares(trade)}</td>
                      <td scope="col" className="px-2 py-2 text-center">{formatedCost(currentOpenCost(trade))}</td>
                      <td scope="col" className="px-2 py-2 text-center">{formatedPrice(price)}</td>                      
                      <td scope="col" className="px-2 py-2 text-center">{formatedCost(currentValue(price, trade))}</td>
                      <td scope="col" className="px-2 py-2 text-center">{formatedCost(currentGainLoss(price, trade))}</td>                      
                      <td scope="col" className="px-2 py-2 text-center">{formatedPercent(currentGainLoss(price, trade)/currentOpenCost(trade)*100)}</td>
                      <td scope="col" className="px-2 py-2 text-center">{formatedPercent(currentGainLoss(price, trade)/(portfolio)*100)}</td>                      
                      <td scope="col" className="px-2 py-2 text-center">
                        <button className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0 px-2 border border-blue-500 hover:border-transparent rounded-md">
                          <Link href={{
                            pathname: `/trade-statistics/details`,
                            query: {
                              tradeGroup: JSON.stringify(trade)
                            }}}>DETAILS</Link></button>
                      </td>
                  </tr>
              )
        })}
        </tbody>
      </table>
      </div>

    </div>
  )
}

export default CurrentPortfolioComponent