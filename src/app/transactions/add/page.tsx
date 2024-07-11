import React from 'react'
import AddTransactionForm from './components/AddTransactionForm'
import PageTitle from '@/components/PageTitle'

export default function AddTransaction() {
  return (
    <div className='m-4 mt-20'>
        <PageTitle title={"Add Transaction"} />
        <AddTransactionForm />
    </div>
  )
}
