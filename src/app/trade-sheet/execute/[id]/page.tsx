import GetTransactionById from '@/services/getTransactionById'
import React from 'react'
import PageTitle from '@/components/PageTitle'
import GetToDoById from '@/services/toDos/getToDoById'
import ExecuteTradeForm from './components/ExecuteTradeForm'


export default async function EditTransaction({ params }: { params: { id: string } }) {

    const transactionsData = await GetToDoById(params.id)
    const transaction = (await transactionsData).data

    return (
        <div className='m-4 mt-20'>
            <PageTitle title={"Execute To Do"} />
            <ExecuteTradeForm transaction={transaction} />
        </div>
    )
}
