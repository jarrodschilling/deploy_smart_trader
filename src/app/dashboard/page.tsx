
import CurrentPortfolioComponent from "../current-portfolio/components/CurrentPortfolioComponent"
import DashboardCalcs from "./components/DashboardCalcs"
import TradeSheet from "../trade-sheet/page"

export default function Dashboard() {
  return (
    <>
        <h1>This is the DASHBOARD</h1>
        <br />
        <DashboardCalcs />
        <CurrentPortfolioComponent />
        <br />
        <h2>Trade Sheet</h2>
        <TradeSheet />
    </>
  )
}
