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
        "id": number,
        "name": string,
        "username": string,
        "email": string,
        "address": {
            "street": string,
            "suite": string,
            "city": string,
            "zipcode": string,
            "geo": {
            "lat": string,
            "lng": string
            }
        },
        "phone": string,
        "website": string,
        "company": {
            "name": string,
            "catchPhrase": string,
            "bs": string
        }
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