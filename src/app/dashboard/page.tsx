
import CurrentPortfolioComponent from "../current-portfolio/components/CurrentPortfolioComponent"
import DashboardCalcs from "./components/DashboardCalcs"
import TradeSheet from "../trade-sheet/page"
import PageTitle from "@/components/PageTitle"
import getStockPrices from "@/services/yahoo/getStockPrices"
import { Transaction } from "@prisma/client"
import GetUserByEmail from "@/services/getUserByEmail"
import groupTrades from "@/lib/groupTrades"
import { openTradeTrue } from "@/lib/tradeStatFunctions"
import Link from "next/link"
import BetaTesting from "@/components/BetaTesting"
import { getServerSession } from "next-auth"

export default async function Dashboard() {
  const session = await getServerSession();
  let closedTrades: Transaction[][] = []
  let openTrades: Transaction[][] = []
  let stockPrices:Record<string, number> = {}
  let dbError = ""
  let pricingError = ""
  let portfolioValue = 0
  let user = null
  let transGroup = null

  // Fetch all data
  if (!session?.user?.email) {
    dbError = "No session found, please log in.";
    } else {
        try {
            const userEmail = session.user.email;
            user = await GetUserByEmail(userEmail);
            // Fetch portfolio value
            portfolioValue = user.portfolioValue

            // Fetch open trades
            transGroup = groupTrades(user.transactions)
            closedTrades = transGroup
            let newTrades = transGroup
            let openTradesArray = []
            for (let i = 0; i < newTrades.length; i++) {
              if (openTradeTrue(newTrades[i]) === false) {
                openTradesArray.push(newTrades[i])
              }
            }
            openTrades = openTradesArray
        } catch (err) {
          dbError = "Failed to load User data, please reload the page.";
        }
    }

    if (openTrades.length > 0) {
      try {
        const promises = openTrades.map(async (trade) => {
          const symbol = trade[0].ticker;
          const response = await getStockPrices(symbol);
          const stockPrice = response.chart.result[0].meta.regularMarketPrice;
          return { symbol, stockPrice };
        });
        const prices = await Promise.all(promises);
        const priceMap = prices.reduce((acc, { symbol, stockPrice }) => {
          acc[symbol] = stockPrice;
          return acc;
        }, {} as Record<string, number>);
        stockPrices = priceMap
      } catch (err) {
        pricingError = "Failed to load current stock price, please reload the page.";
      }
    }

  
  return (
    <div className='m-4 md:mt-24 mt-36'>
      <BetaTesting />
      <PageTitle title={"Dashboard"} />
      <div className='flex justify-center'>
      <button
        className="mb-2 w-44 bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-4 rounded focus:outline-none focus:shadow-outline">
          <Link href={"/user-settings"}>
          User Settings
          </Link>
      </button>
      </div>
      <DashboardCalcs portfolioValue={portfolioValue} closedTrades={closedTrades} openTrades={openTrades} stockPrices={stockPrices} />
      <CurrentPortfolioComponent portfolioValue={portfolioValue} openTrades={openTrades} stockPrices={stockPrices} />
      <br />
      <TradeSheet />
      <br />
      <br />
      <br />

    </div>
  )
}
