import { Transaction } from "@prisma/client"
import { gainLoss, percentGainLoss, portfolioPercentImpact } from "./tradeStatFunctions"


const portfolio = 1000000


function clearOpenTrades (tradesList: Transaction[][]) {
    let updatedTrades = []
    
    for (const trades of tradesList) {
        for (const trade of trades) {
            if (trade.closeTrade === true) {
                updatedTrades.push(trades)
            }
        }
    }
    return updatedTrades
}
// console.log(clearOpenTrades(allTrades))
// console.log(clearOpenTrades(allTrades)[3][0].ticker)


function battingAvg (trades:any) {
    let win = 0
    let loss = 0
    let avgWinList = []
    let avgLossList = []
    for (const trade of trades) {
        if (gainLoss(trade) >= 0) {
            win += 1
            avgWinList.push(gainLoss(trade))
        }
        else {
            loss += 1
            avgLossList.push(gainLoss(trade))
        }
    }
    let winPct = win/(win+loss)*100
    let lossPct = 100 - winPct

    for (const win of avgWinList) {

    }
    return {winPct, lossPct}
}

// console.log(battingAvg(allTrades).winPct)
// console.log(battingAvg(allTrades).lossPct)

function avgDollarWinLoss (trades:any) {
    let avgWin = 0
    let avgLoss = 0
    let avgWinList = []
    let avgLossList = []
    for (const trade of trades) {
        if (gainLoss(trade) >= 0) {
            avgWinList.push(gainLoss(trade))
        }
        else {
            avgLossList.push(gainLoss(trade))
        }
    }
    for (const win of avgWinList) {
        avgWin += win
    }
    for (const loss of avgLossList) {
        avgLoss += loss
    }
    let finalWin = avgWin/avgWinList.length
    let finalLoss = avgLoss/avgLossList.length
    return {finalWin, finalLoss}
}

// console.log(avgDollarWinLoss(allTrades).finalWin)
// console.log(avgDollarWinLoss(allTrades).finalLoss)


function avgPctWinLoss (trades:any) {
    let avgWin = 0
    let avgLoss = 0
    let avgWinList = []
    let avgLossList = []
    for (const trade of trades) {
        if (percentGainLoss(trade) >= 0) {
            avgWinList.push(percentGainLoss(trade))
        }
        else {
            avgLossList.push(percentGainLoss(trade))
        }
    }
    for (const win of avgWinList) {
        avgWin += win
    }
    for (const loss of avgLossList) {
        avgLoss += loss
    }
    let finalWin = avgWin/avgWinList.length
    let finalLoss = avgLoss/avgLossList.length
    return {finalWin, finalLoss}
}

// console.log(avgPctWinLoss(allTrades).finalWin)
// console.log(avgPctWinLoss(allTrades).finalLoss)

function avgPortWinLoss (trades:any) {
    let avgWin = 0
    let avgLoss = 0
    let avgWinList = []
    let avgLossList = []
    for (const trade of trades) {
        
        if (portfolioPercentImpact(portfolio, trade) >= 0) {
            avgWinList.push(portfolioPercentImpact(portfolio, trade))
        }
        else {
            avgLossList.push(portfolioPercentImpact(portfolio, trade))
        }
    }
    for (const win of avgWinList) {
        avgWin += win
    }
    for (const loss of avgLossList) {
        avgLoss += loss
    }
    let finalWin = avgWin/avgWinList.length
    let finalLoss = avgLoss/avgLossList.length
    return {finalWin, finalLoss}
}

// console.log(avgPortWinLoss(allTrades).finalWin)
// console.log(avgPortWinLoss(allTrades).finalLoss)

function realizedGainLoss (trades:any) {
    let realized = 0
    for (const trade of trades) {
        realized += gainLoss(trade)
    }
    return realized
}

// console.log(realizedGainLoss(allTrades))

function totalDollarPL (realized:any, unrealized:any) {
    return realized + unrealized
}

function totalPctPL (portfolio:any, dollarReturn:any) {
    return dollarReturn/portfolio * 100
}

export {
    battingAvg,
    avgDollarWinLoss,
    avgPctWinLoss,
    avgPortWinLoss,
    realizedGainLoss,
    totalDollarPL,
    totalPctPL,
    clearOpenTrades
}