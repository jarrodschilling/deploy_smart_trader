"use client"
import React from "react"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { addTransactionFormSchema } from "../../../../../schemas/schema"
import CreateTransaction from "@/services/createTransaction"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { AddTransactionFormData } from "../../../../../types"
import getStockName from "@/services/yahoo/getStockNames"
import CreateToDo from "@/services/toDos/createToDo"
import GetUserByEmail from "@/services/getUserByEmail"
import { mutate } from "swr"
import { app_domain } from "@/lib/domain"


export default function AddToDoForm() {
    const { data: session } = useSession()
    const email = session?.user?.email;
    const [dbUserId, setDbUserId] = useState("")
    const [loading, setLoading] = useState(true)
    const [stockNameError, setStockNameError] = useState("")

    useEffect(() => {
        setLoading(true)
        const fetchUserId = async () => {
            const userEmail = session?.user?.email
            const response = await GetUserByEmail(userEmail)
            setDbUserId(response.id)
        }
        fetchUserId()
        setLoading(false)
    }, [])

    const {
        register,
        handleSubmit,
        formState:{errors},
        watch,
        setValue,
    } = useForm<AddTransactionFormData>({
        resolver: zodResolver(addTransactionFormSchema)
        })

    const watchBuySell = watch("buySell")


    const router = useRouter()
    async function handleAddToDo(data: AddTransactionFormData) {
        const newValue = data.ticker
        let stockName
        try {
            const response = await getStockName(newValue)
            stockName = response.quoteType.result[0].shortName
            
        } catch (error) {
            
        }
        
        if(stockName){
            const updatedData = {...data, name:stockName, userId: dbUserId}
            // @ts-ignore
            CreateToDo(updatedData)
            mutate(`${app_domain}/api/users/${email}`)
            router.push('/trade-sheet')
        }else{
            setStockNameError("Invalid Symbol")
        }
    }
    return (
        <>
        <div className="flex justify-center mx-auto">
        <div className="border-2 border-slate-200 bg-black rounded-md w-lg flex justify-start mt-2">
        <div className="max-w-xl p-6">
            <form className="w-full max-w-lg" onSubmit={handleSubmit(handleAddToDo)}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="ticker">Ticker*</label>
                    <input
                        {...register("ticker", { required: "This is required." })}
                        className="appearance-none block uppercase w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        name="ticker"
                        id="ticker"
                        placeholder="NVDA"
                    />
                    {
                        errors.ticker && (
                            <p>
                                {errors.ticker.message}
                            </p>
                        )
                    }
                    {
                        stockNameError && (
                            <p className="text-lg font-bold text-blue-500">{stockNameError}</p>
                        )
                    }
                    </div>
                    
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="date">Date*</label>
                    <input 
                        {...register("date")}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="date"
                        name="date"
                        id="date"
                        
                    />
                    {
                        errors.date && (
                            <p>
                                {errors.date.message}
                            </p>
                        )
                    }
                    </div>
                    
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="buySell">Buy/Sell*</label>
                    <div className="relative">
                    <select
                        {...register("buySell")}
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="buySell"
                        id="buySell"
                    >
                        <option value="">Pick One</option>
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                    </div>
                    {
                        errors.buySell && (
                            <p>
                                {errors.buySell.message}
                            </p>
                        )
                    }
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="shares">Shares*</label>
                    <input
                        {...register("shares")}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="number"
                        name="shares"
                        id="shares"
                    />
                    {
                        errors.shares && (
                            <p>
                                {errors.shares.message}
                            </p>
                        )
                    }
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="price">Price*</label>
                    <input
                        {...register("price")}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        
                        name="price"
                        id="price"
                    />
                    {
                        errors.price && (
                            <p>
                                {errors.price.message}
                            </p>
                        )
                    }
                    </div>
                </div>
                    
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="shaper">Shaper</label>
                    <div className="relative">
                    <select
                        {...register("shaper")}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        
                        name="shaper"
                        id="shaper"
                    >
                        
                        {
                            watchBuySell == "buy"?
                        <>
                            <option value="">Pick One</option>
                            <option value="Cup w/ Handle">Cup w/ Handle</option>
                            <option value="Cup no Handle">Cup no Handle</option>
                            <option value="Volatility Contraction">Volatility Contraction</option>
                            <option value="Ascending Triangle">Ascending Triangle</option>
                            <option value="Coil">Coil</option>
                            <option value="Rectangle">Rectangle</option>
                            <option value="Flat Base">Flat Base</option>
                            <option value="High Tight Flag">High Tight Flag</option>
                            <option value="Double Bottom">Double Bottom</option>
                            <option value="First Touch of 10WK SMA">First Touch of 10WK SMA</option>
                            <option value="Dollar Cost Averaging">Dollar Cost Averaging</option>
                            <option value="Inverse Head and Shoulders">Inverse Head and Shoulders</option>
                            <option value="Add on Buy">Add on Buy</option>
                            <option value="Carry Over">Carry Over</option>
                            </>:
                            watchBuySell == "sell"?
                            <>
                            <option value="">Pick One</option>
                            <option value="Initial Stop Hit">Initial Stop Hit</option>
                            <option value="Stop at Breakeven">Stop at Breakeven</option>
                            <option value="Stock lost 10WK SMA">Stock lost 10WK SMA</option>
                            <option value="De-risk">De-risk</option>
                            <option value="Lock in Some Profit">Lock in Some Profit</option>
                            <option value="Sell into Strength">Sell into Strength</option>
                            <option value="Earnings Soon">Earnings Soon</option>
                            </>:
                            <option value="">Pick One</option>
                        }
                        
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                    </div>
                    {
                        errors.shaper && (
                            <p>
                                {errors.shaper.message}
                            </p>
                        )
                    }
                    </div>
                    
                    <div className="w-full md:w-1/2 px-3 mb-0 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="tactical">Tactical</label>
                    <div className="relative">
                    <select
                        {...register("tactical")}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        
                        name="tactical"
                        id="tactical"
                    >
                        <option value="">Pick One</option>
                        <option value="Pattern Breakout">Pattern Breakout</option>
                        <option value="Mini Coil">Mini Coil</option>
                        <option value="Kicker">Kicker</option>
                        <option value="Downtrend Line">Downtrend Line</option>
                        <option value="50MA Res Failure">50MA Res Failure</option>
                        <option value="Gap Up PB to 8EMA">Gap Up PB to 8EMA</option>
                        <option value="Breakout PB to 20EMA">Breakout PB to 20EMA</option>
                        <option value="Base Retest">Base Retest</option>
                        <option value="Pullback to VWAP">Pullback to VWAP</option>
                        <option value="Early Cheat">Early Cheat</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                    </div>
                    {
                        errors.tactical && (
                            <p>
                                {errors.tactical.message}
                            </p>
                        )
                    }
                    </div>
                </div>
                    {
                        watchBuySell == "sell"?
                    <>
                    <div className="mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="openTrade">Close Trade*</label>
                    <div className="relative">
                    <select
                        {...register("closeTrade")}
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="closeTrade"
                        id="closeTrade"
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                    </div>
                    </div>
                    {
                        errors.closeTrade && (
                            <p>
                                {errors.closeTrade.message}
                            </p>
                        )
                    }
                    </>:
                    <></>
                    }
                    
                    {
                        watchBuySell == "buy"?
                    <>
                    <div className="mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="openTrade">Open Trade*</label>
                    <div className="relative">
                    <select
                        {...register("openTrade")}
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="openTrade"
                        id="openTrade"
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                    </div>
                    </div>
                    {
                        errors.openTrade && (
                            <p>
                                {errors.openTrade.message}
                            </p>
                        )
                    }
                    </>:
                    <></>
                    }
                    <input
                        {...register("name")}
                        type="hidden"
                        name="name"
                        id="name"
                    />
                    <input
                        {...register("userId")}
                        type="hidden"
                        name="userId"
                        id="userId"
                    />
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="submit">
                            Add To Do
                    </button>
                </form>
        </div>
        </div>
        </div>
        </>
    )
}
