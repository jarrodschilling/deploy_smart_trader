
import GetTransactionById from '@/services/getTransactionById'
import { useRouter } from 'next/router'
import React from 'react'
import OneTransaction from '../../components/OneTransaction'
import DeleteTransactionForm from './components/DeleteTransactionForm'
import PageTitle from '@/components/PageTitle'

export default async function DeleteTransaction({ params }: { params: { id: string } }) {
    const transactionsData = await GetTransactionById(params.id)
    const transaction = (await transactionsData).data

    return (
        <div className='m-4 mt-20'>
            <PageTitle title={'Delete Transaction'} />
            <h1 className='font-bold text-xl'>Are you sure you want to PERMANENTLY DELETE this transaction?</h1>
            <OneTransaction transaction={transaction} />
            <DeleteTransactionForm transaction={transaction} />
        </div>
    )
}
