import Layout from './components/Layout'
import Main from './components/Main'
import Login from './components/Login'
import Register from './components/Register'
import { createContext, useState } from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
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

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route index element={<Main />}/>
      </Route>
      
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
    </>
  ))

  return(
    <taskContext.Provider value={{tasks, setTasks}}>
      <RouterProvider router={router}/>
    </taskContext.Provider>
  )
}