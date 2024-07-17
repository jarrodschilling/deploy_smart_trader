const transaction = {
    buySell: "buy",
    openTrade: true
}

function colorScheme(onColors, advColors, highlight, transaction) {
    (onColors === "false" && advColors === "false" && highlight === "false")? 'noColor':
    (onColors === "false" && advColors === "false" && highlight === "true")? 'noColorHighLight':
    (onColors === "true" && advColors === "false" && highlight === "false" && transaction.buySell === "buy")? 'colorsBuy':
    (onColors === "true" && advColors === "false" && highlight === "false" && transaction.buySell === "sell")? 'colorsSell':
    (onColors === "true" && advColors === "false" && highlight === "true" && transaction.buySell === "buy")? 'colorsHighlightBuy':
    (onColors === "true" && advColors === "false" && highlight === "true" && transaction.buySell === "sell")? 'colorsHighlightSell':
    (advColors === "true" && highlight === "false" && transaction.buySell === "buy" && transaction.openTrade === false)? 'advancedColorsBuy':
    (advColors === "true" && highlight === "false" && transaction.buySell === "sell" && transaction.closeTrade === false)? 'advancedColorsSell':
    (advColors === "true" && highlight === "true" && transaction.buySell === "buy" && transaction.openTrade === false)? 'advancedColorsHighlightBuy':
    (advColors === "true" && highlight === "true" && transaction.buySell === "sell" && transaction.closeTrade === false)? 'advancedColorsHighlightSell':
    (advColors === "true" && highlight === "false" && transaction.openTrade === true)? 'advancedColorsOpen':
    (advColors === "true" && highlight === "false" && transaction.closeTrade === true)? 'advancedColorsClose':
    (advColors === "true" && highlight === "true" && transaction.openTrade === true)? 'advancedColorsHighlightOpen':
    advancedColorsHighlightClose
}   


const trade = "hello"
function openTradeTrue(trade) {
    return true
}

function gainLoss(trade) {
    return true
}

function colorScheme(onColors, highlight, trade) {
    (openTradeTrue(trade) === false && onColors === "false" && highlight === "false")? 'tradeStatsNoColor':
    (openTradeTrue(trade) === false && onColors === "false" && highlight === "true")? 'tradeStatsNoColorHighlight':
    (openTradeTrue(trade) === false && onColors === "true" && highlight === "false" && gainLoss(trade)>0)? 'tradeStatsColorWin':
    (openTradeTrue(trade) === false && onColors === "true" && highlight === "false" && gainLoss(trade)<0)? 'tradeStatsColorLoss':
    (openTradeTrue(trade) === false && onColors === "true" && highlight === "true" && gainLoss(trade)>0)? 'tradeStatsColorWinHighlight':
    (openTradeTrue(trade) === false && onColors === "true" && highlight === "true" && gainLoss(trade)<0)? 'tradeStatsColorLossHighlight':
    ''
}   