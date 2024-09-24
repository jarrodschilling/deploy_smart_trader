
import PageTitle from "@/components/PageTitle"
import GetUserByEmail from "@/services/getUserByEmail";
import getStockPrices from "@/services/yahoo/getStockPrices";
import { ToDo, Transaction } from "@prisma/client";
import { getServerSession } from "next-auth";
import MainHeader from "./components/MainHeader";
import MainComponent from "./components/MainComponent";


export default async function CurrentPortfolioPage() {
  const session = await getServerSession();
  let toDosData: ToDo[] = []
  let stockPrices:Record<string, number> = {}
  let dbError = ""
  let pricingError = ""
  let user = null
  let transGroup = null

  // Fetch all data
  if (!session?.user?.email) {
    dbError = "No session found, please log in.";
    } else {
        try {
            const userEmail = session.user.email;
            user = await GetUserByEmail(userEmail)

            // Fetch open trades
            toDosData = user.toDos
            
        } catch (err) {
          dbError = "Failed to load User data, please reload the page.";
        }
    }

    if (toDosData.length > 0) {
      try {
        const promises = toDosData.map(async (toDo) => {
          const symbol = toDo.ticker;
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
    <div className='m-4 mt-20 mb-24'>
      {dbError ? (
          <p className="text-red-500">{dbError}</p>
      ) : (
          <>
            <PageTitle title={"Trade Sheet"} />
            {pricingError? <p className="text-red-500">{pricingError}</p>:<></>}
            <MainComponent toDosData={toDosData} stockPrices={stockPrices}/>
          </>
      )}
    </div>
  )
}
