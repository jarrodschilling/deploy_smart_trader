
import { formatedCost, formatedPercent, formatedPrice } from '@/lib/formatFunctions'
import { avgClosePrice, avgOpenPrice, gainLoss, percentGainLoss, portfolioPercentImpact, totalCost, totalSold } from '@/lib/tradeStatFunctions'
import { Transaction } from '@prisma/client'
import React, { useEffect, useState } from 'react'

export default function ClosedTradeDetailsHeader({ tradeGroup }: { tradeGroup:Transaction[] }) {
    
    const portfolio = 1000000

    let tradeGainLoss = gainLoss(tradeGroup)
    let tradeTotalCost = totalCost(tradeGroup)
    let tradeAvgOpenPrice = avgOpenPrice(tradeGroup)
    let tradeAvgClosePrice = avgClosePrice(tradeGroup)
    let tradeTotalSold = totalSold(tradeGroup)
    let tradePercentGainLoss = percentGainLoss(tradeGroup)
    let tradePortfolioPctImpact = portfolioPercentImpact(portfolio, tradeGroup)

    return (
        <div className='flex justify-center'>
        <div className='box-border w-1/2 border p-2'>
            <div className="flex flex-wrap ml-10 mb-6">
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-2" htmlFor="ticker">Total Cost</label>
                    <p>{formatedCost(tradeTotalCost)}</p>
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="date">Total Sold</label>
                    <p>{formatedCost(tradeTotalSold)}</p>
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="date">Gain/Loss ($)</label>
                    <p>{formatedCost(tradeGainLoss)}</p>
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="date">Gain/Loss (%)</label>
                    <p>{formatedPercent(tradePercentGainLoss)}</p>
                    </div>
            </div>
            <div className="flex flex-wrap ml-10">
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="ticker">Avg Open Px</label>
                    <p>{formatedPrice(tradeAvgOpenPrice)}</p>
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="date">Avg Close Px</label>
                    <p>{formatedPrice(tradeAvgClosePrice)}</p>
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="ticker"></label>
                    <p></p>
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="date">Port Impact</label>
                    <p>{formatedPercent(tradePortfolioPctImpact)}</p>
                    </div>
            </div>
        </div>
        </div>
    )
}
