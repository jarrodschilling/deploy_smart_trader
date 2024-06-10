import CurrentPortfolioCalcs from "./components/CurrentPortfolioCalcs"
import CurrentPortfolioComponent from "./components/CurrentPortfolioComponent"

export default async function CurrentPortfolioPage() {
  return (
    <>
      <h1>Current Portfolio Page</h1>
      <CurrentPortfolioCalcs />
      <CurrentPortfolioComponent />
    </>
  )
}
