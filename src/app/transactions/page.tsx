'use client'

import AddTransactionForm from './add-transaction/components/AddTransactionForm'
import { dateChanger, totalCostFmt, formatedPrice } from '@/lib/formatFunctions'
import GetAllTransactions from '@/services/getAllTransactions'
import DeleteTransaction from '@/services/deleteTransaction'
import Link from 'next/link'
import { DeleteForm } from './components/DeleteForm'
import { useEffect, useState } from 'react'



export default function Transactions() {
  const [advColors, setAdvColors] = useState<string>("false")
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  // console.log(await tradesData)
  const [error, setError] = useState<string | null>(null)

  useEffect (() => {
    const fetchTransactions = async () => {
      setIsLoading(true)
      try {
        const response = await GetAllTransactions()
        setTransactions(response)
      } catch(error) {
        console.log("Error:", error)
        setError("Failed to load transactions, please reload the page")
      } finally {
        setIsLoading(false)
      }
    };
    fetchTransactions()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await DeleteTransaction(id)
      setTransactions((prevTransactions) => 
        prevTransactions?.filter((i) => i.id !== id)
    )
    } catch(error) {
      setError("Failed to delete transaction, please try again")
    }
  }

  const handleAdvColors = async () => {
    if (advColors === "false") {
    setAdvColors("true")
    }
    else {setAdvColors('false')}
    console.log(advColors)
  }

  return (
    <>
      <h1>Trade Ledger(ALL TRANSACTIONS)</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        ><Link href="/transactions/add-transaction">Add New Transaction</Link></button>
      <br />
      <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={handleAdvColors}>Advanced Colors</button>
      {error && <p>{error}</p>}
      {isLoading ? (<p>Loading transactions...</p>):
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-200">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
              <th scope="col" className="px-0 py-4">Date</th>
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
              <th scope="col" className="px-0 py-4">EDIT</th>
              <th scope="col" className="px-0 py-4">DELETE</th>
          </tr>
        </thead>
        <tbody>
            {
              transactions
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((transaction) => (
                  <tr key={transaction.id} 
                  className={`${
                  (advColors === "false")?((transaction.buySell === "buy")? 'bg-white border-b dark:bg-lime-800 dark:border-gray-700': 
                  'bg-white border-b dark:bg-red-800 dark:border-gray-700'): (transaction.openTrade === true)? 'bg-white border-b dark:bg-lime-800 dark:border-gray-700'
                  :(transaction.closeTrade === true)? 'bg-white border-b dark:bg-red-800 dark:border-gray-700'
                  :(transaction.buySell === "buy")? 'bg-white border-b dark:bg-lime-600 dark:border-gray-700'
                  :'bg-white border-b dark:bg-red-600 dark:border-gray-700'}`}>
                      <td scope="col" className="px-0 py-2">{dateChanger(transaction.date)}</td>
                      <td scope="col" className="px-0 py-2">{transaction.ticker}</td>
                      <td scope="col" className="px-0 py-2">{transaction.name}</td>
                      <td scope="col" className="px-0 py-2">{transaction.buySell}</td>
                      <td scope="col" className="px-0 py-2">{formatedPrice(transaction.price)}</td>
                      <td scope="col" className="px-0 py-2">{transaction.shares}</td>
                      <td scope="col" className="px-0 py-2">{totalCostFmt(transaction.price, transaction.shares)}</td>
                      <td scope="col" className="px-0 py-2">{transaction.shaper}</td>
                      <td scope="col" className="px-0 py-2">{transaction.tactical}</td>
                      <td scope="col" className="px-0 py-2">{transaction.openTrade? "Yes": ""}</td>
                      <td scope="col" className="px-0 py-2">{transaction.closeTrade? "Yes": ""}</td>
                      <td scope="col" className="px-0 py-2">
                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><Link href={`/update/${transaction.id}`}>EDIT</Link></button>
                      </td>
                      {/* <td><button onClick={() => handleDelete(transaction.id)}>DELETE Render</button></td> */}
                      
                      <td scope="col" className="px-0 py-2">
                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><Link href={`/transactions/delete/${transaction.id}`}>DELETE Form</Link></button>
                      </td>
                  </tr>
              )
            )}
        </tbody>
      </table>
      </div>
      }
    </>
  )
}
