'use client'

import AddTransactionForm from './add-transaction/components/AddTransactionForm'
import { dateChanger, totalCostFmt, formatedPrice } from '@/lib/formatFunctions'
import GetAllTransactions from '@/services/getAllTransactions'
import DeleteTransaction from '@/services/deleteTransaction'
import Link from 'next/link'
import { DeleteForm } from './components/DeleteForm'
import { useEffect, useState } from 'react'



export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>()
  const [isLoading, setIsLoading] = useState(true)
  // console.log(await tradesData)
  const [error, setError] = useState<string | null>(null)

  useEffect (() => {
    const fetchTransactions = async () => {
      setIsLoading(true)
      try {
        const response = await GetAllTransactions()
        setTransactions(response.data)
      } catch(error) {
        console.log("Error:", error)
        setError("Failed to load transactions, please reload the page")
      } finally {
        setIsLoading(false)
      }
    };
    fetchTransactions()
  }, [])

  return (
    <>
      <h1>Trade Ledger(ALL TRANSACTIONS)</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        ><Link href="/transactions/add-transaction">Add New Transaction</Link></button>
      <br />
      {error && <p>{error}</p>}
      {isLoading ? (<p>Loading transactions...</p>):
      <table>
        <thead>
          <tr>
              <th>Date</th>
              <th>Ticker</th>
              <th>Name</th>
              <th>Buy/Sell</th>
              <th>Price</th>
              <th>Shares</th>
              <th>Total Value</th>
              <th>Shaper</th>
              <th>Tactical</th>
              <th>OPEN</th>
              <th>CLOSE</th>
              <th>EDIT</th>
              <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
            {
              transactions
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((transaction) => (
                  <tr key={transaction.id} 
                  className={`${(transaction.openTrade === true)? 'ledgerOpen'
                  :(transaction.closeTrade === true)? 'ledgerClose'
                  :(transaction.buySell === "buy")? 'ledgerBuy'
                  :'ledgerSell'}`}>
                      <td>{dateChanger(transaction.date)}</td>
                      <td>{transaction.ticker}</td>
                      <td>{transaction.name}</td>
                      <td>{transaction.buySell}</td>
                      <td>{formatedPrice(transaction.price)}</td>
                      <td>{transaction.shares}</td>
                      <td>{totalCostFmt(transaction.price, transaction.shares)}</td>
                      <td>{transaction.shaper}</td>
                      <td>{transaction.tactical}</td>
                      <td>{transaction.openTrade? "Yes": ""}</td>
                      <td>{transaction.closeTrade? "Yes": ""}</td>
                      <td><button className="editDeleteBtn"><Link href={`/update/${transaction.id}`}>EDIT</Link></button></td>
                      {/* <td><button className="editDeleteBtn" onClick={()=>deleteHandler(trade.id)}>DELETE</button></td> */}
                      <td><Link href={`/transactions/delete/${transaction.id}`}>DELETE</Link></td>
                  </tr>
              )
            )}
        </tbody>
      </table>
      }
    </>
  )
}
