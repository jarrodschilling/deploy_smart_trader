
import React from 'react'
import PageTitle from '@/components/PageTitle'
import OneTransaction from '@/app/transactions/components/OneTransaction'
import GetToDoById from '@/services/toDos/getToDoById'
import DeleteToDoForm from '../components/DeleteToDoForm'

export default async function DeleteToDo({ params }: { params: { id: string } }) {
    const transactionsData = await GetToDoById(params.id)
    const transaction = (await transactionsData).data

    return (
        <div className='m-4 mt-20'>
            <PageTitle title={'Delete To Do'} />
            <h1 className='font-bold text-xl'>Are you sure you want to PERMANENTLY DELETE this To Do Item?</h1>
            <OneTransaction transaction={transaction} />
            <DeleteToDoForm transaction={transaction} />
        </div>
    )
}
