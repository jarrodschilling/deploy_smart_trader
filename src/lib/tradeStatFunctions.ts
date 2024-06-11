const portfolio = 1000000



function gainLoss (tradeList: Trade[]) {
    // console.log(`gainloss test ${tradeList}`)
    let totalGainLoss = 0
    for (let i = 0; i < tradeList.length; i++) {
        if (tradeList[i].buySell === "buy") {
            totalGainLoss += tradeList[i].price * tradeList[i].shares * -1
        }
        else {
            totalGainLoss += tradeList[i].price * tradeList[i].shares
        }
    }
    return totalGainLoss
}


function totalCost (tradeList: Trade[]) {
    let cost = 0
    for (let i = 0; i < tradeList.length; i++) {
        if (tradeList[i].buySell === "buy") {
            cost += tradeList[i].price * tradeList[i].shares
        }
    }
    return cost
}
// console.log(`Total Cost: ${totalCost(trades)}`)


function avgOpenPrice (tradeList: Trade[]) {
    let totalShares = 0
    for (let i = 0; i < tradeList.length; i++) {
        if (tradeList[i].buySell === "buy") {
            totalShares += tradeList[i].shares
        }
    }
    let avgPrice = totalCost(tradeList)/totalShares
    return avgPrice
}
// console.log(`Avg Open Price: ${avgOpenPrice(trades)}`)

function totalSold (tradeList: Trade[]) {
    let value = 0
    for (let i = 0; i < tradeList.length; i++) {
        if (tradeList[i].buySell === "sell") {
            value += tradeList[i].price * tradeList[i].shares
        }
    }
    return value
}
// console.log(`Total Sold: ${totalSold(trades)}`)

function avgClosePrice (tradeList: Trade[]) {
    let totalShares = 0
    let totalValue = 0
    for (let i = 0; i < tradeList.length; i++) {
        if (tradeList[i].buySell === "sell") {
            totalShares += tradeList[i].shares
            totalValue += (tradeList[i].shares * tradeList[i].price)
        }
    }
    let avgPrice = totalValue/totalShares
    return avgPrice
}
// console.log(`Avg Close Price: ${avgClosePrice(trades)}`)

function percentGainLoss(tradeList: Trade[]) {
    let prctGainLoss = 100 * gainLoss(tradeList)/totalCost(tradeList)
    return prctGainLoss
}
// console.log(`% Gain/Loss: ${percentGainLoss(trades)}%`)


function portfolioPercentImpact (portValue: number, tradeList: Trade[]) {
    let portImpact = 100 * gainLoss(tradeList)/portValue
    return portImpact
}
// console.log(`% Portfolio Impact: ${portfolioPercentImpact(portfolio, trades)}%`)


function getOpenDate (trades: Trade[]) {
    for (const trade of trades) {
        if (trade.openTrade === true) {
            return trade.date
        }
    }
}

function getCloseDate (trades: Trade[]) {
    for (const trade of trades) {
        if (trade.closeTrade === true) {
            return trade.date
        }
    }
}


function getOwnedShares (trades: Trade[]) {
    let totalShares = 0
    for (const trade of trades) {
        if (trade.buySell === "buy") {
            totalShares += trade.shares
        }
    }
    return totalShares
}

function currentShares (trades: Trade[]) {
    let totalShares = 0
    for (const trade of trades) {
        if (trade.buySell === "buy") {
            totalShares += trade.shares
        }
        else if (trade.buySell === "sell") {
            totalShares -= trade.shares
        }
    }
    return totalShares
}

function openTradeTrue (trades: Trade[]) {
    let count = 0
    for (const trade of trades) {
        if (trade.closeTrade === true) {
            count += 1
        }
    }
    if (count == 1){
        return true
    }
    else {
        return false
    }
}

function openCurrentCost (tradeList: Trade[]) {
    let cost = 0
    let sales = 0
    let shares = 0
    for (let i = 0; i < tradeList.length; i++) {
        if (tradeList[i].buySell === "buy") {
            cost += tradeList[i].price * tradeList[i].shares
            shares += tradeList[i].shares
        }
        else if (tradeList[i].buySell === "sell") {
            sales += tradeList[i].price * tradeList[i].shares
            shares -= tradeList[i].shares
        }
    }
    if (shares > 0) {
        let avgPrice = (cost-sales)/shares
        return avgPrice
    }
}

export {
    totalCost,
    avgOpenPrice,
    totalSold,
    avgClosePrice,
    percentGainLoss,
    portfolioPercentImpact,
    getOpenDate,
    getCloseDate,
    getOwnedShares,
    gainLoss,
    openTradeTrue,
    currentShares,
    openCurrentCost
}