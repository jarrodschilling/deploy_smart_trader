
import GetTransactionById from '@/services/getTransactionById'
import { useRouter } from 'next/router'
import React from 'react'
import OneTransaction from '../../components/OneTransaction'
import DeleteTransactionForm from './components/DeleteTransactionForm'

export default async function DeleteTransaction({ params }: { params: { id: string } }) {
    const transactionsData = await GetTransactionById(params.id)
    const transaction = (await transactionsData).data

    return (
        <>
            <h1>Are you sure you want to PERMANENTLY DELETE this transaction?</h1>
            <p>{transaction.id}</p>
            <OneTransaction transaction={transaction} />
            <DeleteTransactionForm transaction={transaction} />
        </>
    )
}
