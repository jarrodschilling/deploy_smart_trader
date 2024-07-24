'use client'

import CurrentPortfolioComponent from "../current-portfolio/components/CurrentPortfolioComponent"
import DashboardCalcs from "./components/DashboardCalcs"
import TradeSheet from "../trade-sheet/page"
import PageTitle from "@/components/PageTitle"
import getStockPrices from "@/services/yahoo/getStockPrices"
import { useEffect, useState } from "react"
import { Transaction } from "@prisma/client"
import { useSession } from "next-auth/react"
import GetUserByEmail from "@/services/getUserByEmail"
import groupTrades from "@/lib/groupTrades"
import { openTradeTrue } from "@/lib/tradeStatFunctions"

export default function Dashboard() {
  const [closedTrades, setClosedTrades] = useState<Transaction[][]>([])
  const [openTrades, setOpenTrades] = useState<Transaction[][]>([])
  const [stockPrices, setStockPrices] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { data: session, status } = useSession()

  useEffect (() => {
    const fetchTransactions = async () => {
      setIsLoading(true)
      try {
        const userEmail = session?.user?.email
        const response = await GetUserByEmail(userEmail)
        // const response = await GetAllTransactions()
        const transGroup = groupTrades(response.transactions)
        setClosedTrades(transGroup)
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  
  return (
    <div className='m-4 mt-20'>
      <PageTitle title={"Dashboard"} />
      <DashboardCalcs closedTrades={closedTrades} openTrades={openTrades} stockPrices={stockPrices} />
      <CurrentPortfolioComponent openTrades={openTrades} stockPrices={stockPrices} />
      <br />
      <br />
      
      <TradeSheet />
    </div>
  )
}
