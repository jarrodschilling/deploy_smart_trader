"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { addTransactionFormSchema } from "../../../../../schemas/schema"
import CreateTransaction from "@/services/createTransaction"
import ChangeHandlerHook from "@/hooks/useFormAddTransaction"
import { useState } from "react"


export default function AddNewTransactionForm() {
    const {
        stockState,
        formErrors,
        notRequired,
        handleChange
    } = ChangeHandlerHook(e)
    async function handleAddTransaction(data: AddTransactionFormData) {
        console.log(data)
        CreateTransaction(data)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newValue = stockState.ticker
        let stockName
        try {
                const response = await YahooService.getName(newValue);
                // console.log(response)
                stockName = response.quoteType.result[0].shortName
                // console.log(stockName)
            } catch (error) {
                console.error("Error fetching stock name:", error);
            }
        const updatedStockState = { ...stockState, name: stockName }
        
        StockService.addOneStock(updatedStockState)
            .then(res => {
            console.log(res)
            navigate('/ledger')
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors)
            })
    }
    return (
        <>
            <h1>Register User</h1>
            <form className="w-full max-w-lg" onSubmit={handleSubmit(handleAddTransaction)}>
                <div className="flex flex-wrap -mx-3 mb-2">
                    
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="ticker">ticker</label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        name="ticker"
                        id="ticker"
                        placeholder="NVDA"
                    />
                    {formErrors.ticker? <p>{formErrors.ticker}</p>: <p> </p>}

                    </div>
                    
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="date">date</label>
                    <input 
                        
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
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
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="buySell">buySell</label>
                    <div className="relative">
                    <select
                        
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
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="shares">shares</label>
                    <input
                        
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
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="price">price</label>
                    <input
                        
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="number"
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
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="shares">name</label>
                    <input
                        
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        name="name"
                        id="name"
                    />
                    {
                        errors.name && (
                            <p>
                                {errors.name.message}
                            </p>
                        )
                    }
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="price">userId</label>
                    <input
                        
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        name="userId"
                        id="userId"
                    />
                    {
                        errors.userId && (
                            <p>
                                {errors.userId.message}
                            </p>
                        )
                    }
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="shaper">shaper</label>
                    <input
                        
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        name="shaper"
                        id="shaper"
                    />
                    {
                        errors.shaper && (
                            <p>
                                {errors.shaper.message}
                            </p>
                        )
                    }
                    </div>
                    
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tactical">tactical</label>
                    <input
                        
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        name="tactical"
                        id="tactical"
                    />
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
                        getValues("buySell") == "sell"?
                    <>

                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="openTrade">Close Trade</label>
                    <div className="relative">
                    <select
                        
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
                    
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="openTrade">openTrade</label>
                    <div className="relative">
                    <select
                        
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
                    {
                        errors.openTrade && (
                            <p>
                                {errors.openTrade.message}
                            </p>
                        )
                    }

                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="submit">
                            Add Transaction
                    </button>
                </form>
        </>
    )
}
