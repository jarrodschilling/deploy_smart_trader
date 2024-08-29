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
import Link from "next/link"
import BetaTesting from "@/components/BetaTesting"

export default function Dashboard() {
  const [closedTrades, setClosedTrades] = useState<Transaction[][]>([])
  const [openTrades, setOpenTrades] = useState<Transaction[][]>([])
  const [stockPrices, setStockPrices] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true)
  const [portfolioValue, setPortfolioValue] = useState(0)
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

  useEffect (() => {
    const fetchPortfolioValue = async () => {
        try {
            const userEmail = session?.user?.email
            const response = await GetUserByEmail(userEmail)
            setPortfolioValue(response.portfolioValue)
        } catch(error) {
            setError("Failed to load portfolio value, please reload the page")
        }
    };
    fetchPortfolioValue()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  
  return (
    <div className='m-4 mt-20'>
      <BetaTesting />
      <PageTitle title={"Dashboard"} />
      <div className='flex justify-center'>
      <button
        className="mb-2 w-44 bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-4 rounded focus:outline-none focus:shadow-outline">
          <Link href={"/user-settings"}>
          User Settings
          </Link>
      </button>
      </div>
      <DashboardCalcs portfolioValue={portfolioValue} closedTrades={closedTrades} openTrades={openTrades} stockPrices={stockPrices} />
      <CurrentPortfolioComponent portfolioValue={portfolioValue} openTrades={openTrades} stockPrices={stockPrices} />
      <br />
      <TradeSheet />
      <br />
      <br />
      <br />

    </div>
  )
}
