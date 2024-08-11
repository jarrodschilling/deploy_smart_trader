'use client'
import PageTitle from "@/components/PageTitle"
import CurrentPortfolioComponent from "./components/CurrentPortfolioComponent"
import { useEffect, useState } from "react";
import GetUserByEmail from "@/services/getUserByEmail";
import groupTrades from "@/lib/groupTrades";
import { openTradeTrue } from "@/lib/tradeStatFunctions";
import getStockPrices from "@/services/yahoo/getStockPrices";
import { Transaction } from "@prisma/client";
import { useSession } from "next-auth/react";
import CurrentPortfolioHeader from "./components/CurrentPortfolioHeader";

export default function CurrentPortfolioPage() {
  const [closedTrades, setClosedTrades] = useState<Transaction[][]>([])
  const [openTrades, setOpenTrades] = useState<Transaction[][]>([])
  const [stockPrices, setStockPrices] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [portfolioValue, setPortfolioValue] = useState(0)
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
        console.log(`new trades array? ${newTrades}`)
        let openTradesArray = []
        for (let i = 0; i < newTrades.length; i++) {
          if (openTradeTrue(newTrades[i]) === false) {
            openTradesArray.push(newTrades[i])
          }
        }
        console.log(`open trades array? ${openTradesArray}`)
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
      <PageTitle title={"Current Portfolio"} />
      <CurrentPortfolioHeader portfolioValue={portfolioValue} closedTrades ={closedTrades} openTrades={openTrades} stockPrices={stockPrices} />
      <CurrentPortfolioComponent portfolioValue={portfolioValue} openTrades={openTrades} stockPrices={stockPrices} />
    </div>
  )
}
