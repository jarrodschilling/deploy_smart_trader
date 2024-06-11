

export default function groupTrades(trades: Trade[]): Trade {
    const tradeGroups = new Map()

    trades.forEach((trade, index) => {
        const tickerKey = `${trade.ticker}`
        
        if (!tradeGroups.has(tickerKey)) {
        tradeGroups.set(tickerKey, [])
        }

        const tickerGroup = tradeGroups.get(tickerKey)

        if (trade.openTrade) {
        // Start a new trade group
        tickerGroup.push([trade])
        } else if (trade.closeTrade) {
        // Find the last open trade group for the ticker and add to it
        const lastOpenGroup = tickerGroup[tickerGroup.length - 1]
        if (lastOpenGroup) {
            lastOpenGroup.push(trade)
        }
        } else {
        // Add to the last open trade group for the ticker
        const lastOpenGroup = tickerGroup[tickerGroup.length - 1]
        if (lastOpenGroup) {
            lastOpenGroup.push(trade)
        }
        }
    });

    return Array.from(tradeGroups.values()).reduce((acc, groups) => acc.concat(groups), [])
    }
