"use client"
import PageTitle from "@/components/PageTitle"
import { useEffect, useState } from "react";
import GetUserByEmail from "@/services/getUserByEmail";
import { ToDo, Transaction } from "@prisma/client";
import { useSession } from "next-auth/react";
import TradeSheetComponent from "./components/TradeSheetComponent";
import TradeSheetHeader from "./components/TradeSheetHeader";
import getStockPrices from "@/services/yahoo/getStockPrices";
import { dateChanger, formatedPercent, formatedPrice, totalCostFmt } from "@/lib/formatFunctions";
import Link from "next/link";
import UrgentToDoUpdate from "@/services/toDos/urgentToDoUpdate";


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

  const makeUrgentHandler = (currentStatus: boolean, idForChange: string) => {
    try {
        
        const newStatus = !currentStatus
        UrgentToDoUpdate({quickAction: newStatus}, idForChange)
        setToDos((prevToDos) =>
            prevToDos.map((toDo: ToDo) =>
                toDo.id === idForChange ? { ...toDo, quickAction: newStatus} : toDo
            )
        )
    }
    catch (error) {
        console.log(error)
    }
  }

  const makeEnteredHandler = (currentStatus: boolean, idForChange: string) => {
    try {
        
        const newStatus = !currentStatus
        UrgentToDoUpdate({entered: newStatus}, idForChange)
        setToDos((prevToDos) =>
            prevToDos.map((toDo: ToDo) =>
                toDo.id === idForChange ? { ...toDo, entered: newStatus} : toDo
            )
        )
    }
    catch (error) {
        console.log(error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }


  return (
    <div className='m-4 mt-20'>
      <PageTitle title={"Trade Sheet"} />
      <div className=''>
        <div className='justify-between flex m-1 mb-2'>
            <div>
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                ><Link href="/trade-sheet/add">Add New To Do</Link></button>
            </div>
            <br />
            <div></div>
        </div>
        {error && <p>{error}</p>}
        
        <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg max-h-96 -mb-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-200">
                <thead className="sticky top-0 text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                <tr>
                    <th scope="col" className="px-2 py-4">Date</th>
                    <th scope="col" className="px-2 py-4">Ticker</th>
                    <th scope="col" className="px-2 py-4 text-center">Buy/<br/>Sell</th>
                    <th scope="col" className="px-4 py-4 text-center">Price</th>
                    <th scope="col" className="px-4 py-4 text-center">Distance</th>
                    <th scope="col" className="px-4 py-4 text-center">Shares</th>
                    <th scope="col" className="px-4 py-4 text-center">Total<br/>Value</th>
                    <th scope="col" className="px-2 py-4">Shaper</th>
                    <th scope="col" className="px-2 py-4">Tactical</th>
                    {/* <th scope="col" className="px-2 py-4">OPEN</th> */}
                    {/* <th scope="col" className="px-2 py-4">CLOSE</th> */}
                    <th scope="col" className="px-2 py-1 text-center">URGENT</th>
                    <th scope="col" className="px-2 py-1 text-center">ENTERED</th>
                    <th scope="col" className="px-2 py-1 text-center"></th>
                    <th scope="col" className="px-2 py-1 text-center"></th>
                    <th scope="col" className="px-2 py-1 text-center"></th>
                </tr>
            </thead>
            <tbody>
                {
                toDos
                .sort((a, b) => (a.buySell.localeCompare(b.buySell)) || (Math.abs((a.price-stockPrices[a.ticker])/a.price*100) - Math.abs((b.price-stockPrices[b.ticker])/b.price*100)))
                .map((toDo: ToDo, index: number) => {
                    const price = stockPrices[toDo.ticker]
                    return (
                    <tr key={index} 
                    className={`${
                      (toDo.entered === true)? 'enteredTrade':
                      (toDo.quickAction === true)?'urgentTrade':
                      'noColor'}`}>
                        <td scope="col" className="px-2 py-2">{dateChanger(toDo.date)}</td>
                        <td scope="col" className="px-2 py-2">{toDo.ticker}</td>
                        <td scope="col" className="px-4 py-2">{toDo.buySell.toUpperCase()}</td>
                        <td scope="col" className="px-4 py-4 text-center">{formatedPrice(toDo.price)}</td>
                        <td scope="col" className="px-4 py-4 text-center">{formatedPercent((toDo.price-price)/toDo.price*100)}</td>
                        <td scope="col" className="px-4 py-4 text-center">{toDo.shares}</td>
                        <td scope="col" className="px-4 py-4 text-center">{totalCostFmt(toDo.price, toDo.shares)}</td>
                        <td scope="col" className="px-2 py-2">{toDo.shaper}</td>
                        <td scope="col" className="px-2 py-2">{toDo.tactical}</td>
                        {/* <td scope="col" className="px-2 py-2 text-center">{toDo.openTrade? "Yes": ""}</td> */}
                        {/* <td scope="col" className="px-2 py-2 text-center">{toDo.closeTrade? "Yes": ""}</td> */}
                        
                        <td scope="col" className="px-2 py-2 text-center">
                        <button 
                          className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0 px-2 border border-blue-500 hover:border-transparent rounded-md"
                          onClick={() => makeUrgentHandler(toDo.quickAction, toDo.id)}>
                            URGENT</button>
                        </td>

                        <td scope="col" className="px-2 py-2 text-center">
                        <button 
                          className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0 px-2 border border-blue-500 hover:border-transparent rounded-md"
                          onClick={() => makeEnteredHandler(toDo.entered, toDo.id)}>
                            ✓</button>
                        </td>

                        <td scope="col" className="px-2 py-2 text-center">
                        <button className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0 px-2 border border-blue-500 hover:border-transparent rounded-md"><Link href={`/trade-sheet/edit/${toDo.id}`}>EDIT</Link></button>
                        </td>

                        <td scope="col" className="px-2 py-2 text-center">
                        <button className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0 px-2 border border-blue-500 hover:border-transparent rounded-md"><Link href={`/trade-sheet/delete/${toDo.id}`}>DELETE</Link></button>
                        </td>

                        <td scope="col" className="px-0 py-2 text-center">
                        <button className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0 px-2 border border-blue-500 hover:border-transparent rounded-md"><Link href={`/trade-sheet/execute/${toDo.id}`}>ADD</Link></button>
                        </td>
                    </tr>
                )
                })}
            </tbody>
            </table>
        </div>

        </div>
    </div>
  )
}
