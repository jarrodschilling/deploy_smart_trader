'use client'
import { currentGainLoss, currentOpenCost, currentValue } from '@/lib/currentPortfolioCalcs';
import { formatedCost, formatedPercent, formatedPrice } from '@/lib/formatFunctions'
import { avgClosePrice, avgOpenPrice, currentShares, gainLoss, percentGainLoss, portfolioPercentImpact, totalCost, totalSold } from '@/lib/tradeStatFunctions'
import getStockPrices from '@/services/yahoo/getStockPrices';
import { Transaction } from '@prisma/client'
import React, { useEffect, useState } from 'react'

export default function OpenTradeDetailsHeader({ tradeGroup }: { tradeGroup:Transaction[] }) {
    const [stockPrice, setStockPrice] = useState<any>();
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const portfolio = 1000000

    useEffect(() => {
        const fetchStockPrices = async () => {
            setIsLoading(true);
            try {
                const symbol = tradeGroup[0].ticker;
                const response = await getStockPrices(symbol);
                const yahooStockPrice = response.chart.result[0].meta.regularMarketPrice;
                setStockPrice(yahooStockPrice)
                return { stockPrice };
            } catch (error) {
                console.error("Error fetching stock prices", error);
            } finally {
                setIsLoading(false);
            }
            };
            fetchStockPrices();
        }, [tradeGroup]);

    let headerOpenPx = (avgOpenPrice(tradeGroup))
    let headerOpenShares = currentShares(tradeGroup)
    let headerOpenCost = (currentOpenCost(tradeGroup))
    let headerOpenCurrentPx = (stockPrice)
    let headerOpenCurrentValue = (currentValue(stockPrice, tradeGroup))
    let headerOpenGainLoss = (currentGainLoss(stockPrice, tradeGroup))
    let headerOpenGainLossPct = (currentGainLoss(stockPrice, tradeGroup)/currentOpenCost(tradeGroup)*100)
    let headerOpenPortImp = (currentGainLoss(stockPrice, tradeGroup)/(portfolio)*100)

    return (
        <div className='flex justify-center'>
        <div className='box-border rounded-md w-1/2 border p-2 pb-3'>
            <div className="flex flex-wrap ml-0 mb-4">

                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="ticker">Avg Open Px</label>
                    <p className='border pl-1'>{formatedPrice(headerOpenPx)}</p>
                    </div>

                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="date">Shares Owned</label>
                    <p className='border pl-1'>{headerOpenShares}</p>
                    </div>

                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="date">Gain/Loss ($)</label>
                    <p
                        className={`${(headerOpenGainLoss > 0)?'border bg-green-700 box-border pl-1':'border bg-red-700 box-border pl-1'}`}>
                            {formatedCost(headerOpenGainLoss)}
                    </p>
                    </div>

                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="date">Current Value</label>
                    <p
                        className={`${(headerOpenGainLoss > 0)?'border bg-green-700 box-border pl-1':'border bg-red-700 box-border pl-1'}`}>
                            {formatedCost(headerOpenCurrentValue)}
                    </p>
                    </div>

            </div>
            <div className="flex flex-wrap ml-0">
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="ticker">Current Px</label>
                    <p className='border pl-1'>{formatedPrice(headerOpenCurrentPx)}</p>
                    </div>

                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="date">Open Cost</label>
                    <p className='border pl-1'>{formatedCost(headerOpenCost)}</p>
                    </div>

                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="ticker">Gain/Loss (%)</label>
                    <p
                        className={`${(headerOpenGainLoss > 0)?'border bg-green-700 box-border pl-1':'border bg-red-700 box-border pl-1'}`}>
                            {formatedPercent(headerOpenGainLossPct)}
                    </p>
                    </div>

                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block underline decoration-solid uppercase tracking-wide text-gray-300 text-sm font-extrabold mb-1" htmlFor="date">Port Impact</label>
                    <p
                        className={`${(headerOpenGainLoss > 0)?'border bg-green-700 box-border pl-1':'border bg-red-700 box-border pl-1'}`}>
                            {formatedPercent(headerOpenPortImp)}
                    </p>
                    </div>

            </div>
        </div>
        </div>
    )
}
