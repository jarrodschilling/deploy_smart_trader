import { Transaction } from "@prisma/client";


// export default function groupTrades(trades: Transaction[]): Transaction {
//     const tradeGroups = new Map()


//     trades.forEach((trade, index) => {
//         const tickerKey = `${trade.ticker}`
        
//         if (!tradeGroups.has(tickerKey)) {
//         tradeGroups.set(tickerKey, [])
//         }

//         const tickerGroup = tradeGroups.get(tickerKey)

//         if (trade.openTrade) {
//         // Start a new trade group
//         tickerGroup.push([trade])
//         } else if (trade.closeTrade) {
//         // Find the last open trade group for the ticker and add to it
//         const lastOpenGroup = tickerGroup[tickerGroup.length - 1]
//         if (lastOpenGroup) {
//             lastOpenGroup.push(trade)
//         }
//         } else {
//         // Add to the last open trade group for the ticker
//         const lastOpenGroup = tickerGroup[tickerGroup.length - 1]
//         if (lastOpenGroup) {
//             lastOpenGroup.push(trade)
//         }
//         }
//     });

//     return Array.from(tradeGroups.values()).reduce((acc, groups) => acc.concat(groups), [])
//     }



// Assuming the return type is an array of arrays of Transactions
type GroupedTransaction = Transaction[][]; 

export default function groupTrades(trades: Transaction[]): GroupedTransaction {
    const tradeGroups = new Map<string, Transaction[][]>();
    
    trades.sort((a, b) => {
        const dateComparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        
        // If dates are the same, prioritize openTrade over closeTrade
        if (dateComparison === 0) {
            if (a.openTrade && !b.openTrade) return -1;
            if (!a.openTrade && b.openTrade) return 1;
        }
        
        return dateComparison;
    }).forEach((trade) => {
        const tickerKey = `${trade.ticker}`;
        
        if (!tradeGroups.has(tickerKey)) {
            tradeGroups.set(tickerKey, []);
        }

        const tickerGroup = tradeGroups.get(tickerKey)!; // Use non-null assertion
        
        if (trade.openTrade && trade.buySell === "buy") {
            // Start a new trade group
            tickerGroup.push([trade]);
        } else if (trade.closeTrade && trade.buySell === "sell") {
            // Find the last open trade group for the ticker and add to it
            const lastOpenGroup = tickerGroup[tickerGroup.length - 1];
            if (lastOpenGroup) {
                lastOpenGroup.push(trade);
            }
        } else {
            // Add to the last open trade group for the ticker
            const lastOpenGroup = tickerGroup[tickerGroup.length - 1];
            if (lastOpenGroup) {
                lastOpenGroup.push(trade);
            }
        }
    });

    return Array.from(tradeGroups.values()).reduce((acc, groups) => acc.concat(groups), []);
}
