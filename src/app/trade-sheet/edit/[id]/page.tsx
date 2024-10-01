import PageTitle from '@/components/PageTitle'
import GetToDoById from '@/services/toDos/getToDoById'
import EditToDoForm from '../components/EditToDoForm'


export default async function EditTransaction({ params }: { params: { id: string } }) {

  const toDosNew = await GetToDoById(params.id)
  const toDoData = (await toDosNew).data

  return (
    <div className='m-4 mt-20'>
        <PageTitle title={"Edit To Do"} />
        <EditToDoForm toDoData={toDoData} />
    </div>
  )
}