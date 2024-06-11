import getAllTrades from '@/services/getAllTrades'
import { dateChanger, totalCostFmt, formatedPrice } from '@/lib/formatFunctions'
import groupTrades from '@/lib/groupTrades'
import Link from 'next/link'

export default async function TradeLedger() {
  const tradesData: Promise<Trade[]> = getAllTrades()
  const trades = await tradesData

  console.log(groupTrades(trades))

  return (
    <>
      <h1>Trade Ledger(ALL TRADES)</h1>
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
              trades
              // .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((trade) => (
                  <tr key={trade.id} 
                  className={`${(trade.openTrade === true)? 'ledgerOpen'
                  :(trade.closeTrade === true)? 'ledgerClose'
                  :(trade.buySell === "buy")? 'ledgerBuy'
                  :'ledgerSell'}`}>
                      <td>{dateChanger(trade.date)}</td>
                      <td>{trade.ticker}</td>
                      <td>{trade.name}</td>
                      <td>{trade.buySell}</td>
                      <td>{formatedPrice(trade.price)}</td>
                      <td>{trade.shares}</td>
                      <td>{totalCostFmt(trade.price, trade.shares)}</td>
                      <td>{trade.shaper}</td>
                      <td>{trade.tactical}</td>
                      <td>{trade.openTrade? "Yes": ""}</td>
                      <td>{trade.closeTrade? "Yes": ""}</td>
                      <td><button className="editDeleteBtn"><Link href={`/update/${trade.id}`}>EDIT</Link></button></td>
                      {/* <td><button className="editDeleteBtn" onClick={()=>deleteHandler(trade.id)}>DELETE</button></td> */}
                  </tr>
              )
            )}
        </tbody>
      </table>
    </>
  )
}
