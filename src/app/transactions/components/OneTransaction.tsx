'use client'

import { dateChanger, formatedPrice, totalCostFmt } from "@/lib/formatFunctions"


type TransactionProps = {
    transaction: Transaction
}

export default function OneTransaction({ transaction }: TransactionProps) {

    return (
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
                <tr>
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
                </tr>
            </tbody>
        </table>
    )
}
