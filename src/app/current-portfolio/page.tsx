import CurrentPortfolioCalcs from "./components/CurrentPortfolioCalcs"
import CurrentPortfolioComponent from "./components/CurrentPortfolioComponent"

export default async function CurrentPortfolioPage() {
  return (
    <div className='m-4 mt-20'>
      <h1>Current Portfolio Page</h1>
      <CurrentPortfolioCalcs />
      <CurrentPortfolioComponent />
    </div>
  )
}
