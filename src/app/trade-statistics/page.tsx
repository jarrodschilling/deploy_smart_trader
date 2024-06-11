import getAllTrades from "@/services/getAllTrades"
import TradeStatsCalcs from "./components/TradeStatsCalcs"
import { dateChanger, formatedCost, formatedPercent, formatedPrice } from "@/lib/formatFunctions"
import { avgClosePrice, avgOpenPrice, gainLoss, getCloseDate, getOpenDate, getOwnedShares, openTradeTrue, percentGainLoss, totalCost, totalSold } from "@/lib/tradeStatFunctions"
import groupTrades from "@/lib/groupTrades"

export default async function TradeStatistics() {
  const tradesData: Promise<Trade[]> = getAllTrades()
  const combineTrades = await tradesData
  const trades = groupTrades(combineTrades)
  // const trades = await tradesData
  console.log(trades)
  const portfolio = 1000000
  
  return (
    <>
        <h1>Trade Statistics</h1>
        <TradeStatsCalcs />
        <table>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Name</th>
              <th>Open Date</th>
              <th>Close Date</th>
              <th>Avg Open Price</th>
              <th>Shares</th>
              <th>Open Cost</th>
              <th>Close Price</th>
              <th>Close Value</th>
              <th>Gain/Loss</th>
              <th>Gain/Loss %</th>
              <th>Portfolio P/L</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
              {
                trades
                // .sort((a, b) => new Date(a[0].date) - new Date(b[0].date))
                .map((trade: Trade[], index: number) => (
                    <tr key={index} className={`${(openTradeTrue(trade) === false)? '':(gainLoss(trade)>0)? 'ledgerBuy': 'ledgerSell'}`}>
                        <td>{trade[0].ticker}</td>
                        <td>{trade[0].name}</td>
                        <td>{dateChanger(getOpenDate(trade))}</td>
                        <td>{dateChanger(getCloseDate(trade))}</td>
                        <td className={`${(openTradeTrue(trade) === false)? 'hidden': ''}`}>{formatedPrice(avgOpenPrice(trade))}</td>
                        <td className={`${(openTradeTrue(trade) === false)? 'hidden': ''}`}>{getOwnedShares(trade)}</td>
                        <td className={`${(openTradeTrue(trade) === false)? 'hidden': ''}`}>{formatedCost(totalCost(trade))}</td>
                        <td className={`${(openTradeTrue(trade) === false)? 'hidden': ''}`}>{formatedPrice(avgClosePrice(trade))}</td>
                        <td className={`${(openTradeTrue(trade) === false)? 'hidden': ''}`}>{formatedCost(totalSold(trade))}</td>
                        <td className={`${(openTradeTrue(trade) === false)? 'hidden': ''}`}>{formatedCost(gainLoss(trade))}</td>
                        <td className={`${(openTradeTrue(trade) === false)? 'hidden': ''}`}>{formatedPercent(percentGainLoss(trade))}</td>
                        <td className={`${(openTradeTrue(trade) === false)? 'hidden': ''}`}>{formatedPercent(gainLoss(trade)/(portfolio)*100)}</td>
                        
                        {/* <td><button className="editDeleteBtn" onClick={()=>detailsHandler(trade)}>Details</button></td> */}
                    </tr>
                  )
              )}
          </tbody>
      </table>
    </>
  )
}
