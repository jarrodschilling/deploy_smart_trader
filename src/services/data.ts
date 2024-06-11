

export const TRADES: Trade[] = [
    {
        id: '1',
        ticker: 'AAPL',
        name: 'Apple',
        // date: new Date(2024, 2, 3),
        date: '2024-03-03T07:00:00.000Z',
        buySell: 'buy',
        shares: 100,
        price: 150.10,
        shaper: 'Cup',
        tactical: 'DTL',
        closeTrade: false,
        openTrade: true
    },
    {
        id: '2',
        ticker: 'AAPL',
        name: 'Apple',
        // date: new Date(2024, 2, 4),
        date: '2024-03-04T07:00:00.000Z',
        buySell: 'buy',
        shares: 50,
        price: 160.30,
        shaper: 'Head and Shoulders',
        tactical: 'Pattern BO',
        closeTrade: false,
        openTrade: false
    },
    {
        id: '3',
        ticker: 'AAPL',
        name: 'Apple',
        // date: new Date(2024, 3, 5),
        date: '2024-03-10T07:00:00.000Z',
        buySell: 'sell',
        shares: 150,
        price: 170,
        shaper: 'Earnings Soon',
        tactical: 'Stop Hit',
        closeTrade: true,
        openTrade: false
    },
];