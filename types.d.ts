import { Account, ToDo } from "@prisma/client"

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



type Transaction = {
    id: string,
    ticker: string,
    name: string,
    date: any,
    buySell: string,
    shares: number,
    price: number,
    shaper?: string,
    tactical?: string,
    closeTrade: Boolean,
    openTrade: Boolean,
    userId?: string,
}

type GroupedTrades = Transaction[]

type RegisterFormData = {
    name: string,
    email: string,
    password: string
}

type LoginFormData = {
    email: string,
    password: string,
}

type AddTransactionFormData = {
    id?: string,
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