
type User =
    {
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        userName: string,
        password: string,
        transactions: Transaction[]
    }

type Transaction = {
    id: string,
    ticker: string,
    name: string,
    // date: Date,
    date: string,
    buySell: string,
    shares: number,
    price: number,
    shaper: string,
    tactical: string,
    closeTrade: Boolean,
    openTrade: Boolean
}

type GroupedTrades = Transaction[]

type RegisterFormData = {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string
}

type AddTransactionFormData = {
    ticker: string,
    name: string,
    date: string,
    buySell: string,
    shares: number,
    price: number,
    shaper: string,
    tactical: string,
    closeTrade: Boolean,
    openTrade: Boolean
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