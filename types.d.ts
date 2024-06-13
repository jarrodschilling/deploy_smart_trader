// Using POSTS from vid as Transactions
type Transaction = {
    "userId": number,
    "id": number,
    "title": string,
    "body": string,
}

// Will need to be updated to User Model
type User =
    {
        firstName: string,
        lastName: string,
        email: string,
        userName: string,
        password: string,
    }

type Trade = {
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

type GroupedTrades = Trade[]