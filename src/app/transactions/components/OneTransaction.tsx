'use client'

import { dateChanger, formatedPrice, totalCostFmt } from "@/lib/formatFunctions"
import { Transaction } from "@prisma/client"


type TransactionProps = {
    transaction: Transaction
}

export default function OneTransaction({ transaction }: TransactionProps) {

    return (
        <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg max-h-96 mb-4 mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-200">
            <thead className="sticky top-0 text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                <tr>
                    <th scope="col" className="px-2 py-4">Date</th>
                    <th scope="col" className="px-2 py-4">Ticker</th>
                    <th scope="col" className="px-2 py-4">Name</th>
                    <th scope="col" className="px-2 py-4">Buy/Sell</th>
                    <th scope="col" className="px-2 py-4">Price</th>
                    <th scope="col" className="px-2 py-4">Shares</th>
                    <th scope="col" className="px-2 py-4">Total Value</th>
                    <th scope="col" className="px-2 py-4">Shaper</th>
                    <th scope="col" className="px-2 py-4">Tactical</th>
                    <th scope="col" className="px-2 py-4">OPEN</th>
                    <th scope="col" className="px-2 py-4">CLOSE</th>
                </tr>
            </thead>
            
            <tbody>
                <tr className="bg-white dark:bg-slate-500 dark:border-gray-700 dark:border-b-white">
                    <td scope="col" className="px-2 py-2">{dateChanger(transaction.date)}</td>
                    <td scope="col" className="px-2 py-2">{transaction.ticker}</td>
                    <td scope="col" className="px-2 py-2">{transaction.name}</td>
                    <td scope="col" className="px-2 py-2">{transaction.buySell}</td>
                    <td scope="col" className="px-2 py-2">{formatedPrice(transaction.price)}</td>
                    <td scope="col" className="px-2 py-2">{transaction.shares}</td>
                    <td scope="col" className="px-2 py-2">{totalCostFmt(transaction.price, transaction.shares)}</td>
                    <td scope="col" className="px-2 py-2">{transaction.shaper}</td>
                    <td scope="col" className="px-2 py-2">{transaction.tactical}</td>
                    <td scope="col" className="px-2 py-2">{transaction.openTrade? "Yes": ""}</td>
                    <td scope="col" className="px-2 py-2">{transaction.closeTrade? "Yes": ""}</td>
                </tr>
            </tbody>
        </table>
    </div>
    )
}
