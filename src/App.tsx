import Header from './components/Header'
import AddTask from './components/AddTask'
import TaskOverview from './components/TaskOverview'
import Tasks from './components/Tasks'
import { createContext, useState } from 'react'

import type { Task } from './model'

type TaskContextType = {
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export const taskContext = createContext<TaskContextType>({
  tasks: [],
  setTasks: () => {}
})

export default function App(){

  const [tasks, setTasks] = useState<Task[]>([])

  return(
    <taskContext.Provider value={{tasks, setTasks}}>
      <Header />

      <main className='flex flex-col px-[160px] mt-[30px] gap-6'>
        <AddTask />
        <TaskOverview />
        <Tasks />
      </main>
    </taskContext.Provider>
  )
}