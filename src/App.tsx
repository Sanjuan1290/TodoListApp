import Header from './components/Header'
import AddTask from './components/AddTask'
import TaskOverview from './components/TaskOverview'

export default function App(){

  return(
    <>
      <Header />

      <main className='flex flex-col px-[160px] mt-[30px] gap-6'>
        <AddTask />
        <TaskOverview />
      </main>
    </>
  )
}