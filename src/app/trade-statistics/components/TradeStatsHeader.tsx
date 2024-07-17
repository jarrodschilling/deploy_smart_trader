
import { formatedCost, formatedPercent, formatedPrice } from '@/lib/formatFunctions'
import { avgClosePrice, avgOpenPrice, gainLoss, percentGainLoss, portfolioPercentImpact, totalCost, totalSold } from '@/lib/tradeStatFunctions'
import { Transaction } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { TradeStatsHeaderType } from '../../../../types'

export default function TradeStatsHeader({ tradeStats }: { tradeStats:TradeStatsHeaderType }) {
    
    const portfolio = 1000000



    return (
        <div className='flex justify-center'>
        <div className='box-border rounded-md w-3/4 border p-2 pb-3'>
            <div className="flex flex-wrap ml-0 mb-4">
                    <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                        <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="ticker">Win %</label>
                        <p className='border pl-1'>{tradeStats.winPercent}</p>
                    </div>
                    <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                        <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="date">Avg Win (%)</label>
                        <p className='border pl-1'>{tradeStats.avgWinPercent}</p>
                    </div>
                    <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                        <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="date">Avg Win ($)</label>
                        <p className='border pl-1'>{tradeStats.avgWinUSD}</p>
                    </div>
                    <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                        <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="date">Avg Port Win (%)</label>
                        <p className='border pl-1'>{tradeStats.avgPortWin}</p>
                    </div>
                    <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                        <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="date">Realized</label>
                        <p
                            className={`${(tradeStats.rlzGainLoss > 0)?'border bg-green-700 box-border pl-1':'border bg-red-700 box-border pl-1'}`}>
                                {formatedCost(tradeStats.rlzGainLoss)}
                        </p>
                    </div>
                    <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                        <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="date">Total P/L($)</label>
                        <p
                            className={`${(tradeStats.rlzGainLoss > 0)?'border bg-green-700 box-border pl-1':'border bg-red-700 box-border pl-1'}`}>
                                HOLD
                        </p>
                    </div>
            </div>
            <div className="flex flex-wrap ml-0">
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                        <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="ticker">Loss %</label>
                        <p className='border pl-1'>{tradeStats.lossPercent}</p>
                    </div>
                    <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                        <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="date">Avg Loss (%)</label>
                        <p className='border pl-1'>{tradeStats.avgLossPercent}</p>
                    </div>
                    <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                        <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="date">Avg Loss ($)</label>
                        <p className='border pl-1'>{tradeStats.avgLossUSD}</p>
                    </div>
                    <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                        <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="date">Avg Port Loss (%)</label>
                        <p className='border pl-1'>{tradeStats.avgPortLoss}</p>
                    </div>
                    <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                        <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="date">Unrealized</label>
                        <p
                            className={`${(tradeStats.rlzGainLoss > 0)?'border bg-green-700 box-border pl-1':'border bg-red-700 box-border pl-1'}`}>
                                HOLD
                        </p>
                    </div>
                    <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                        <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="date">Total P/L(%)</label>
                        <p
                            className={`${(tradeStats.rlzGainLoss > 0)?'border bg-green-700 box-border pl-1':'border bg-red-700 box-border pl-1'}`}>
                                HOLD
                        </p>
                    </div>
            </div>
        </div>
        </div>
    )
}
