import React from 'react'

import PageTitle from '@/components/PageTitle'
import AddToDoForm from './components/AddToDoForm'

export default function AddToDo() {
  return (
    <div className='m-4 mt-20'>
        <PageTitle title={"Add To Do"} />
        <AddToDoForm />
    </div>
  )
}