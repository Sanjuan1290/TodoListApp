import AddTask from './AddTask'
import TaskOverview from './TaskOverview'
import Tasks from './Tasks'

export default function Main(){

    return(
        <main className='flex flex-col px-[10px] sm:px-[20px] md:px-[30px] lg:px-[160px] xl:px-[300px] mt-[30px] gap-6'>
            <AddTask />
            <TaskOverview />
            <Tasks />
        </main>
    )
}