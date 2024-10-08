import GetTransactionById from '@/services/getTransactionById'
import React from 'react'
import EditTransactionForm from '../components/EditTransaction'
import PageTitle from '@/components/PageTitle'


export default async function EditTransaction({ params }: { params: { id: string } }) {

  const transactionsNew = await GetTransactionById(params.id)
  const transaction = (await transactionsNew).data

  return (
    <div className='m-4 mt-20'>
        <PageTitle title={"Edit Transaction"} />
        <EditTransactionForm transactionData={transaction} />
    </div>
  )
}
