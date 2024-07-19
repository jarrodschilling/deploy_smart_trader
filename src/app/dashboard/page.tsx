
import CurrentPortfolioComponent from "../current-portfolio/components/CurrentPortfolioComponent"
import DashboardCalcs from "./components/DashboardCalcs"
import TradeSheet from "../trade-sheet/page"
import PageTitle from "@/components/PageTitle"

export default function Dashboard() {
  return (
    <div className='m-4 mt-20'>
      <PageTitle title={"Dashboard"} />
      <br />
      <DashboardCalcs />
      <CurrentPortfolioComponent />
      <br />
      <br />
      
      <TradeSheet />
    </div>
  )
}
