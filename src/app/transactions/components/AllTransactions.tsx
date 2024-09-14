'use client'

import { dateChanger, totalCostFmt, formatedPrice } from '@/lib/formatFunctions'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import GetUserByEmail from '@/services/getUserByEmail'
import { useRouter } from 'next/navigation'
import { Transaction } from '@prisma/client'
import PageTitle from '@/components/PageTitle'
import { User } from '../../../../types'

type UserProps = {
  user: User
}

export default function AllTransactions({user}: UserProps) {
  const [highlight, setHighlight] = useState<string>("false")
  const [onColors, setOnColors] = useState<string>("false")
  const [advColors, setAdvColors] = useState<string>("false")
  const [transactions, setTransactions] = useState(user.transactions)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect (() => {
    const fetchTransactions = async () => {
      setIsLoading(true)
      try {
        setTransactions(user.transactions)
      } catch(error) {
        // router.push("/")
        setError("Failed to load transactions, please reload the page")
      } finally {
        setIsLoading(false)
      }
    };
    fetchTransactions()
  }, [])

  // const handleDelete = async (id: string) => {
  //   try {
  //     await DeleteTransaction(id)
  //     setTransactions((prevTransactions) => 
  //       prevTransactions?.filter((i) => i.id !== id)
  //   )
  //   } catch(error) {
  //     setError("Failed to delete transaction, please try again")
  //   }
  // }
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
    <>
      <div className='justify-between flex m-1 mb-2'>
        <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white mr-4 font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          ><Link href="/transactions/add">Add New Transaction</Link></button>
          <button
          className="bg-blue-500 hover:bg-blue-700 text-white md:mt-0 mt-2 mr-4 font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          ><Link href="/transactions/excel">Excel Upload</Link></button>
          <button
          className="bg-red-500 hover:bg-red-700 text-white md:mt-0 mt-2 font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          ><Link href="/transactions/deleteAll">Delete ALL Transactions</Link></button>
        </div>

        <div>
        <button
          className={`${(highlight === "false")?'bg-white text-blue-500 font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2'
            :'bg-blue-500 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2'}`}
          onClick={handleHighlight}>Highlight</button>
        <button
          className={`${(onColors === "false")?'bg-white text-blue-500 md:mt-0 mt-2 font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2'
            :'bg-blue-500 text-white font-semibold md:mt-0 mt-2 py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2'}`}
          onClick={handleOnColors}>Colors</button>
        <button
          className={`${(advColors === "false")?'bg-white text-blue-500 md:mt-0 mt-2 font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2'
            :'bg-blue-500 text-white font-semibold md:mt-0 mt-2 py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2'}`}
          onClick={handleAdvColors}>Advanced</button>
        </div>
        </div>
      {error && <p>{error}</p>}
      {isLoading ? (<p>Loading transactions...</p>):
      
      <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg max-h-96 -mb-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-200">
          <thead className="sticky top-0 text-sm text-gray-300 uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-300">
          <tr>
              <th scope="col" className="px-2 py-4">Date</th>
              <th scope="col" className="px-2 py-4">Ticker</th>
              <th scope="col" className="px-2 py-4">Name</th>
              <th scope="col" className="px-2 py-4 text-center">Buy/<br/>Sell</th>
              <th scope="col" className="px-4 py-4 text-center">Price</th>
              <th scope="col" className="px-4 py-4 text-center">Shares</th>
              <th scope="col" className="px-4 py-4 text-center">Total<br/>Value</th>
              <th scope="col" className="px-2 py-4">Shaper</th>
              <th scope="col" className="px-2 py-4">Tactical</th>
              <th scope="col" className="px-2 py-4">OPEN</th>
              <th scope="col" className="px-2 py-4">CLOSE</th>
              <th scope="col" className="px-2 py-1"></th>
              <th scope="col" className="px-2 py-1"></th>
          </tr>
        </thead>
        <tbody>
            {
              transactions
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
                      <td scope="col" className="px-2 py-2">{transaction.ticker}</td>
                      <td scope="col" className="px-2 py-2">{transaction.name}</td>
                      <td scope="col" className="px-4 py-2">{transaction.buySell.toUpperCase()}</td>
                      <td scope="col" className="px-4 py-4 text-center">{formatedPrice(transaction.price)}</td>
                      <td scope="col" className="px-4 py-4 text-center">{transaction.shares}</td>
                      <td scope="col" className="px-4 py-4 text-center">{totalCostFmt(transaction.price, transaction.shares)}</td>
                      <td scope="col" className="px-2 py-2">{transaction.shaper}</td>
                      <td scope="col" className="px-2 py-2">{transaction.tactical}</td>
                      <td scope="col" className="px-2 py-2">{transaction.openTrade? "Yes": ""}</td>
                      <td scope="col" className="px-2 py-2">{transaction.closeTrade? "Yes": ""}</td>
                      <td scope="col" className="px-2 py-2">
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
      }
    </>
  )
}
