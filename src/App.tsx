import Layout from './components/Layout'
import Main from './components/Main'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import { createContext, useState } from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import type { Task } from './model'
import { loader as layLoutLoader } from './components/Layout'
import { loader as profileLoader} from './components/Profile'

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
      <Route path='/' element={<Layout />} loader={layLoutLoader}>
        <Route index element={<Main />}/>
        <Route path='/profile' element={<Profile />} loader={profileLoader}/>
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