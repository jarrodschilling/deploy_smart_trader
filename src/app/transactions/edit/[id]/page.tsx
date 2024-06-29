import GetTransactionById from '@/services/getTransactionById'
import React from 'react'
import EditTransactionForm from '../components/EditTransaction'


export default async function EditTransaction({ params }: { params: { id: string } }) {

  const transactionsData = await GetTransactionById(params.id)
  const transaction = (await transactionsData).data

  return (
    <>
        <h1>Edit One Transaction</h1>
        <EditTransactionForm transaction={transaction} />
    </>
  )
}
