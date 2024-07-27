import { Account, ToDo, Transaction } from "@prisma/client"
import { number } from "zod"

type User =
    {
        id: string,
        email: string,
        emailVarified: any,
        image: string,
        name: string,
        password: string,
        transactions: Transaction[]
        toDos: ToDo[]
        accounts: Account[]
    }


type Transaction = Transaction

type GroupedTrades = Transaction[]

type RegisterFormData = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}

type LoginFormData = {
    email: string,
    password: string,
}

type AddTransactionFormData = {
    id: string | null,
    ticker: string,
    name: string,
    date: string,
    buySell: string,
    shares: number,
    price: number,
    shaper: string,
    tactical: string,
    closeTrade: Boolean,
    openTrade: Boolean,
    userId: string
}

type FetchedTransactionsData = {
    success: boolean,
    message: string,
    data: Transaction[]
}

type FetchOneTransactionData = {
    success: boolean,
    message: string,
    data: Transaction
}

type FetchedUsersData = {
    success: boolean,
    message: string,
    data: User[]
}

type GoogleProfileType = {
    email: string,
    name: string,
    picture: string
}

type TradeStatsHeaderType = {
    winPercent: string,
    lossPercent: string,
    avgWinUSD: string,
    avgLossUSD: string,
    avgWinPercent: string,
    avgLossPercent: string,
    avgPortWin: string,
    avgPortLoss: string,
    rlzGainLoss: number,
    unRlzGainLoss: any,
    totalPL: any,
    totalPLPercent: any
}

type CurrentPortfolioHeaderType = {
    cash: number,
    totalCost: number,
    currentValue: number,
    unrealizedGainLoss: number,
    unrealizedPercent: number,
    porfolioGainLoss: number
}

type StockPricesType = {
    symbol: number
}

type AddToDoFormData = {
    id: string | null,
    ticker: string,
    name: string,
    date: string,
    buySell: string,
    shares: number,
    price: number,
    shaper: string,
    tactical: string,
    closeTrade: Boolean,
    openTrade: Boolean,
    userId: string
}