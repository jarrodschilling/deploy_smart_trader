import React from 'react'
import { GroupedTrades, StockPricesType } from '../../../../types'
import { currentGainLoss, currentOpenCost, currentValue } from '@/lib/currentPortfolioCalcs'
import { formatedCost, formatedPercent } from '@/lib/formatFunctions'
import { clearOpenTrades, realizedGainLoss, totalDollarPL, totalPctPL } from '@/lib/PortStatsFunctions'

interface Props {
  openTrades: Array<GroupedTrades>,
  closedTrades: Array<GroupedTrades>,
  stockPrices: Record<string, number>,
  portfolioValue: number,
}

const DashboardCalcs: React.FC<Props> = ({closedTrades, openTrades, stockPrices, portfolioValue}) => {
  const portfolio = portfolioValue
  
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
let headerTotalCost = formatedCost(unrealizedPL(openTrades).cost)
let headerCurrentValue = formatedCost(unrealizedPL(openTrades).curValue)
let headerUnRlzPL = (unrealizedPL(openTrades).unrlzPL)

let headerUnrealizedPLPct = formatedPercent(unrealizedPL(openTrades).unrlzPL/unrealizedPL(openTrades).cost*100)
let headerPortfolioPL = formatedPercent(unrealizedPL(openTrades).unrlzPL/portfolio*100)

// calculate Realized P/L for cash adjustment
let updatedTrades = clearOpenTrades(closedTrades)
let rlzGainLoss = realizedGainLoss(updatedTrades)
let totalPL = totalDollarPL(rlzGainLoss, headerUnRlzPL)
let totalValue = formatedCost(portfolio + totalPL)
let totalPLPct = formatedPercent(totalPctPL(portfolio, totalPL))

let headerCash = formatedCost(portfolio-unrealizedPL(openTrades).cost+rlzGainLoss)

  return (
    <div className='flex justify-center'>
        <div className='box-border rounded-md w-1/2 border p-2 pb-3'>
            <div className="flex flex-wrap justify-between ml-0 mb-4">
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1">Total Value</label>
                    <p className='border pl-1'>{totalValue}</p>
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1">Realized P/L</label>
                    <p 
                      className={`${(rlzGainLoss > 0)?'border bg-green-700 box-border pl-1':'border bg-red-700 box-border pl-1'}`}>
                        {formatedCost(rlzGainLoss)}
                    </p>
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1">Total P/L ($)</label>
                    <p
                        className={`${(totalPL > 0)?'border bg-green-700 box-border pl-1':'border bg-red-700 box-border pl-1'}`}>
                          {formatedCost(totalPL)}
                    </p>
                    </div>
            </div>
            <div className="flex flex-wrap justify-between ml-0">
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1">Current Inv</label>
                    <p className='border pl-1'>{headerCurrentValue}</p>
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1">Unrealized P/L</label>
                    <p
                        className={`${(headerUnRlzPL > 0)?'border bg-green-700 box-border pl-1':'border bg-red-700 box-border pl-1'}`}>
                          {formatedCost(headerUnRlzPL)}
                    </p>
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1">Total P/L (%)</label>
                    <p className={`${(totalPL > 0)?'border bg-green-700 box-border pl-1':'border bg-red-700 box-border pl-1'}`}>
                      {totalPLPct}
                    </p>
                    </div>
            </div>
        </div>
        </div>
  )
}

export default DashboardCalcs