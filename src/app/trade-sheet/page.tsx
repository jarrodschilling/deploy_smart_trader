"use client"
import PageTitle from "@/components/PageTitle"
import { useEffect, useState } from "react";
import GetUserByEmail from "@/services/getUserByEmail";
import { ToDo, Transaction } from "@prisma/client";
import { useSession } from "next-auth/react";
import TradeSheetComponent from "./components/TradeSheetComponent";
import TradeSheetHeader from "./components/TradeSheetHeader";
import getStockPrices from "@/services/yahoo/getStockPrices";


export default function TradeSheet() {
  const [toDos, setToDos] = useState<ToDo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stockPrices, setStockPrices] = useState<Record<string, number>>({});
  const { data: session, status } = useSession()

  useEffect (() => {
    const fetchToDos = async () => {
      setIsLoading(true)
      try {
        const userEmail = session?.user?.email
        const response = await GetUserByEmail(userEmail)
        console.log(response.toDos)
        setToDos(response.toDos)
      } catch(error) {
        console.log("Error:", error)
        // router.push("/")
        setError("Failed to load to dos, please reload the page")
      } finally {
        setIsLoading(false)
      }
    };
    fetchToDos()
  }, [])

  useEffect(() => {
    const fetchStockPrices = async () => {
      setIsLoading(true);
      try {
        const promises = toDos.map(async (toDo) => {
          const symbol = toDo.ticker;
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

    if (toDos.length > 0) {
      fetchStockPrices();
    }
  }, [toDos]);

  if (isLoading) {
    return <div>Loading...</div>
  }


  return (
    <div className='m-4 mt-20'>
      <PageTitle title={"Trade Sheet (To Dos)"} />
      <TradeSheetComponent toDos={toDos} stockPrices={stockPrices} />
    </div>
  )
}
