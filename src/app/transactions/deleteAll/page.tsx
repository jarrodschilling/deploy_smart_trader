
import { useRouter } from 'next/router'
import React from 'react'
import PageTitle from '@/components/PageTitle'
import DeleteAllTransForm from './components/DeleteAllTransForm'

export default async function DeleteAllTransactions() {

    return (
        <div className='m-4 mt-20'>
            <PageTitle title={'Delete ALL Transactions'} />
            <h1 className='font-bold text-xl'>Are you sure you want to PERMANENTLY DELETE ALL transactions?</h1>
            <DeleteAllTransForm />
        </div>
    )
}
