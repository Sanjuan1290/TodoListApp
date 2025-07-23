import AddTask from './AddTask'
import TaskOverview from './TaskOverview'
import Tasks from './Tasks'

export default function Main(){

    return(
        <main className='flex flex-col px-[160px] mt-[30px] gap-6'>
            <AddTask />
            <TaskOverview />
            <Tasks />
        </main>
    )
}