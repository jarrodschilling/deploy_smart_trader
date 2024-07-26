"use client"
import PageTitle from "@/components/PageTitle"
import { dateChanger, formatedPrice, totalCostFmt } from "@/lib/formatFunctions"
import { Transaction } from "@prisma/client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import ClosedTradeDetailsHeader from "./components/ClosedTradeDetailsHeader"
import OpenTradeDetailsHeader from "./components/OpenTradeDetailsHeader"
import { openTradeTrue } from "@/lib/tradeStatFunctions"


export default function TradeDetails() {
    const [highlight, setHighlight] = useState<string>("false")
    const [onColors, setOnColors] = useState<string>("true")
    const [trade, setTrade] = useState<Transaction[]>([])
    const [advColors, setAdvColors] = useState<string>("false")
    const searchParams = useSearchParams()

    useEffect(() => {
        const tradeGroup = searchParams.get('tradeGroup')
        let data = null
        if (tradeGroup) {
        data = JSON.parse(tradeGroup)
        setTrade(data)
    }
    }, [])
    
    const handleHighlight = async () => {
        if (highlight === "false") {
        setHighlight("true")
        }
        else {setHighlight('false')}
    }
    
    const handleOnColors = async () => {
        if (onColors === "false") {
        setOnColors("true")
        }
        else {setOnColors('false')}
    }

    const handleAdvColors = async () => {
        if (advColors === "false") {
        setAdvColors("true")
        }
        else {setAdvColors('false')}
    }


    return (
        <div className='m-4 mt-20'>
        <PageTitle title={"Trade Details"} />
        {
            openTradeTrue(trade) === false?
            <OpenTradeDetailsHeader tradeGroup={trade} />:
            <ClosedTradeDetailsHeader tradeGroup={trade} />
        }
        <div className='justify-between flex m-1 mb-2'>
        <div>
        </div>

        <br />
        <div>
            <button
            className={`${(highlight === "false")?'bg-white text-blue-500 font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2'
                :'bg-blue-500 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2'}`}
            onClick={handleHighlight}>Highlight</button>
            <button
            className={`${(onColors === "false")?'bg-white text-blue-500 font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2'
                :'bg-blue-500 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2'}`}
            onClick={handleOnColors}>Colors</button>
            <button
            className={`${(advColors === "false")?'bg-white text-blue-500 font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2'
                :'bg-blue-500 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2'}`}
            onClick={handleAdvColors}>Advanced</button>
            </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-200">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
            <tr>
                <th scope="col" className="px-2 py-4">Date</th>
                <th scope="col" className="px-0 py-4">Ticker</th>
                <th scope="col" className="px-0 py-4">Name</th>
                <th scope="col" className="px-0 py-4">Buy/Sell</th>
                <th scope="col" className="px-0 py-4">Price</th>
                <th scope="col" className="px-0 py-4">Shares</th>
                <th scope="col" className="px-0 py-4">Total Value</th>
                <th scope="col" className="px-0 py-4">Shaper</th>
                <th scope="col" className="px-0 py-4">Tactical</th>
                <th scope="col" className="px-0 py-4">OPEN</th>
                <th scope="col" className="px-0 py-4">CLOSE</th>
                <th scope="col" className="px-0 py-1"></th>
                <th scope="col" className="px-0 py-1"></th>
            </tr>
        </thead>
        <tbody>
            {
                trade
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((transaction) => (
                    <tr key={transaction.id} 
                    className={`${
                        (onColors === "false" && advColors === "false" && highlight === "false")? 'noColor':
                        (onColors === "false" && advColors === "false" && highlight === "true")? 'noColorHighLight':
                        (onColors === "true" && advColors === "false" && highlight === "false" && transaction.buySell === "buy")? 'colorsBuy':
                        (onColors === "true" && advColors === "false" && highlight === "false" && transaction.buySell === "sell")? 'colorsSell':
                        (onColors === "true" && advColors === "false" && highlight === "true" && transaction.buySell === "buy")? 'colorsHighlightBuy':
                        (onColors === "true" && advColors === "false" && highlight === "true" && transaction.buySell === "sell")? 'colorsHighlightSell':
                        (advColors === "true" && highlight === "false" && transaction.buySell === "buy" && transaction.openTrade === false)? 'advancedColorsBuy':
                        (advColors === "true" && highlight === "false" && transaction.buySell === "sell" && transaction.closeTrade === false)? 'advancedColorsSell':
                        (advColors === "true" && highlight === "true" && transaction.buySell === "buy" && transaction.openTrade === false)? 'advancedColorsHighlightBuy':
                        (advColors === "true" && highlight === "true" && transaction.buySell === "sell" && transaction.closeTrade === false)? 'advancedColorsHighlightSell':
                        (advColors === "true" && highlight === "false" && transaction.openTrade === true)? 'advancedColorsOpen':
                        (advColors === "true" && highlight === "false" && transaction.closeTrade === true)? 'advancedColorsClose':
                        (advColors === "true" && highlight === "true" && transaction.openTrade === true)? 'advancedColorsHighlightOpen':
                        'advancedColorsHighlightClose'}`}>
                        <td scope="col" className="px-2 py-2">{dateChanger(transaction.date)}</td>
                        <td scope="col" className="px-0 py-2">{transaction.ticker}</td>
                        <td scope="col" className="px-0 py-2">{transaction.name}</td>
                        <td scope="col" className="px-4 py-2">{transaction.buySell.toUpperCase()}</td>
                        <td scope="col" className="px-0 py-2">{formatedPrice(transaction.price)}</td>
                        <td scope="col" className="text-center px-0 py-2">{transaction.shares}</td>
                        <td scope="col" className="px-4 py-2">{totalCostFmt(transaction.price, transaction.shares)}</td>
                        <td scope="col" className="px-0 py-2">{transaction.shaper}</td>
                        <td scope="col" className="px-0 py-2">{transaction.tactical}</td>
                        <td scope="col" className="px-0 py-2">{transaction.openTrade? "Yes": ""}</td>
                        <td scope="col" className="px-0 py-2">{transaction.closeTrade? "Yes": ""}</td>
                        <td scope="col" className="px-0 py-2">
                        <button className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0 px-2 border border-blue-500 hover:border-transparent rounded-md"><Link href={`/transactions/edit/${transaction.id}`}>EDIT</Link></button>
                        </td>
                      {/* <td><button onClick={() => handleDelete(transaction.id)}>DELETE Render</button></td> */}
                        
                        <td scope="col" className="px-0 py-2">
                        <button className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0 px-2 border border-blue-500 hover:border-transparent rounded-md"><Link href={`/transactions/delete/${transaction.id}`}>DELETE</Link></button>
                        </td>
                    </tr>
                )
            )}
        </tbody>
        </table>
        </div>
    </div>
    )
    }
