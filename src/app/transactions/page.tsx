import AddTransactionForm from './add-transaction/components/AddTransactionForm'
import { dateChanger, totalCostFmt, formatedPrice } from '@/lib/formatFunctions'
import GetAllTransactions from '@/services/getAllTransactions'
import DeleteTransaction from '@/services/deleteTransaction'
import Link from 'next/link'
import { DeleteForm } from './components/DeleteForm'



export default async function Transactions() {
  const transactionsData: Promise<FetchedTransactionsData> = GetAllTransactions()
  const transactions = (await transactionsData).data
  // console.log(await tradesData)



  return (
    <>
      <h1>Trade Ledger(ALL TRANSACTIONS)</h1>
      <AddTransactionForm />
      <br />
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
                      <td><DeleteForm id={transaction.id} /></td>
                  </tr>
              )
            )}
        </tbody>
      </table>
    </>
  )
}
