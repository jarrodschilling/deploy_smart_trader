import { Transaction } from "@prisma/client"


const portfolio = 1000000



function gainLoss (tradeList: Transaction[]) {
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


function totalCost (tradeList: Transaction[]) {
    let cost = 0
    for (let i = 0; i < tradeList.length; i++) {
        if (tradeList[i].buySell === "buy") {
            cost += tradeList[i].price * tradeList[i].shares
        }
    }
    return cost
}


function avgOpenPrice (tradeList: Transaction[]) {
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

function totalSold (tradeList: Transaction[]) {
    let value = 0
    for (let i = 0; i < tradeList.length; i++) {
        if (tradeList[i].buySell === "sell") {
            value += tradeList[i].price * tradeList[i].shares
        }
    }
    return value
}


function avgClosePrice (tradeList: Transaction[]) {
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


function percentGainLoss(tradeList: Transaction[]) {
    let prctGainLoss = 100 * gainLoss(tradeList)/totalCost(tradeList)
    return prctGainLoss
}



function portfolioPercentImpact (portValue: number, tradeList: Transaction[]) {
    let portImpact = 100 * gainLoss(tradeList)/portValue
    return portImpact
}



function getOpenDate (trades: any) {
    for (const trade of trades) {
        if (trade.openTrade === true) {
            return trade.date
        }
    }
}

function getCloseDate (trades: any) {
    for (const trade of trades) {
        if (trade.closeTrade === true) {
            return trade.date
        }
    }
}


function getOwnedShares (trades: Transaction[]) {
    let totalShares = 0
    for (const trade of trades) {
        if (trade.buySell === "buy") {
            totalShares += trade.shares
        }
    }
    return totalShares
}

function currentShares (trades: Transaction[]) {
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

function openTradeTrue (trades: Transaction[]) {
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

function openCurrentCost (tradeList: Transaction[]) {
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