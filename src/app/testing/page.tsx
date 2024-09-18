
import PageTitle from "@/components/PageTitle"
import GetUserByEmail from "@/services/getUserByEmail";
import groupTrades from "@/lib/groupTrades";
import { openTradeTrue } from "@/lib/tradeStatFunctions";
import getStockPrices from "@/services/yahoo/getStockPrices";
import { Transaction } from "@prisma/client";
import { getServerSession } from "next-auth";
import MainHeader from "./components/MainHeader";

import { avgDollarWinLoss, avgPctWinLoss, avgPortWinLoss, battingAvg, clearOpenTrades, realizedGainLoss, totalDollarPL, totalPctPL } from "@/lib/PortStatsFunctions";
import { formatedCost, formatedPercent } from "@/lib/formatFunctions";
import { currentGainLoss, currentOpenCost, currentValue } from "@/lib/currentPortfolioCalcs";
import { GroupedTrades, TradeStatsHeaderType } from "../../../types";
import MainComponent from "./components/MainComponent";


export default async function CurrentPortfolioPage() {
  const session = await getServerSession();
  let trades: Transaction[][] = []
  let openTrades: Transaction[][] = []
  let stockPrices:Record<string, number> = {}
  let dbError = ""
  let pricingError = ""
  let portfolioValue = 0
  let user = null
  let transGroup = null

  // Fetch all data
  if (!session?.user?.email) {
    dbError = "No session found, please log in.";
    } else {
        try {
            const userEmail = session.user.email;
            user = await GetUserByEmail(userEmail);
            // Fetch portfolio value
            portfolioValue = user.portfolioValue

            // Fetch open trades
            transGroup = groupTrades(user.transactions)
            trades = transGroup
            let newTrades = transGroup
            let openTradesArray = []
            for (let i = 0; i < newTrades.length; i++) {
              if (openTradeTrue(newTrades[i]) === false) {
                openTradesArray.push(newTrades[i])
              }
            }
            openTrades = openTradesArray
        } catch (err) {
          dbError = "Failed to load User data, please reload the page.";
        }
    }

    if (openTrades.length > 0) {
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
        stockPrices = priceMap
      } catch (err) {
        pricingError = "Failed to load current stock price, please reload the page.";
      }
    }

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


  return (
    <div className='m-4 mt-20 mb-24'>
      {dbError ? (
          <p className="text-red-500">{dbError}</p>
      ) : (
          <>
            <PageTitle title={"Trade Statistics"} />
            <MainHeader tradeStats={tradeStats} />
            {pricingError? <p className="text-red-500">{pricingError}</p>:<></>}
            <MainComponent trades={trades} portfolio={portfolio} />
          </>
      )}
    </div>
  )
}
