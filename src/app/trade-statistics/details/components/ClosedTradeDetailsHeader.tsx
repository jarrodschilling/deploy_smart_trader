
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
        <div className='box-border rounded-md w-1/2 border p-2 pb-3'>
            <div className="flex flex-wrap ml-0 mb-4">
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="ticker">Total Cost</label>
                    <p className='border pl-1'>{formatedCost(tradeTotalCost)}</p>
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="date">Total Sold</label>
                    <p className='border pl-1'>{formatedCost(tradeTotalSold)}</p>
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="date">Gain/Loss ($)</label>
                    <p
                        className={`${(tradeGainLoss > 0)?'border bg-green-700 box-border pl-1':'border bg-red-700 box-border pl-1'}`}>
                            {formatedCost(tradeGainLoss)}
                    </p>
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="date">Gain/Loss (%)</label>
                    <p
                        className={`${(tradeGainLoss > 0)?'border bg-green-700 box-border pl-1':'border bg-red-700 box-border pl-1'}`}>
                            {formatedPercent(tradePercentGainLoss)}
                    </p>
                    </div>
            </div>
            <div className="flex flex-wrap ml-0">
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="ticker">Avg Open Px</label>
                    <p className='border pl-1'>{formatedPrice(tradeAvgOpenPrice)}</p>
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="date">Avg Close Px</label>
                    <p className='border pl-1'>{formatedPrice(tradeAvgClosePrice)}</p>
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="ticker"></label>
                    <p></p>
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="date">Port Impact</label>
                    <p
                        className={`${(tradeGainLoss > 0)?'border bg-green-700 box-border pl-1':'border bg-red-700 box-border pl-1'}`}>
                            {formatedPercent(tradePortfolioPctImpact)}
                    </p>
                    </div>
            </div>
        </div>
        </div>
    )
}
