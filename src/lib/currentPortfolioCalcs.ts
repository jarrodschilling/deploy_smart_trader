import { avgOpenPrice, currentShares } from "./tradeStatFunctions"



function currentOpenCost (stock:any) {
    let cost = avgOpenPrice(stock)*currentShares(stock)
    return cost
}

function currentValue (price:any, stock:any) {
    let value = price*(currentShares(stock))
    return value
}

function currentGainLoss (price:any, stock:any) {
    let value = (price*(currentShares(stock)))-(avgOpenPrice(stock)*currentShares(stock))
    return value
}


export {
    currentOpenCost,
    currentValue,
    currentGainLoss
}