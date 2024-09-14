import GetUserByEmail from '@/services/getUserByEmail'
import PageTitle from '@/components/PageTitle'
import { getServerSession } from "next-auth";
import AllTransactions from './components/AllTransactions'


export default async function Transactions() {
  const session = await getServerSession();
  let user = null
  let transactions = null
  let error = ""
  let xyz = ""

  if (!session?.user?.email) {
    error = "No session found, please log in."
  } else {
      try {
          const userEmail = session.user.email
          user = await GetUserByEmail(userEmail)
      } catch (err) {
          error = "Failed to load User, please reload the page."
      }
  }

  return (
    <div className='m-4 mt-20'>
      <PageTitle title={"Transactions"} />
      <AllTransactions user={user} />
    </div>
  )
}
