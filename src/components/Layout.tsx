import { Outlet, redirect, useLoaderData } from "react-router-dom"
import { useContext, useEffect } from "react"
import Header from './Header'
import { taskContext } from "../App"
import type { Task } from "../model"

export async function loader(){
    const savedToken = localStorage.getItem('token') || JSON.stringify('')
    const token = JSON.parse(savedToken)

    if (!token) return redirect('/login') 

    const res = await fetch('http://localhost:3000/api/v1/verify', {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    })

    const result = await res.json()

    if(!res.ok){
        console.error(result.message);
    }

    console.log(result.tasks);

    if (!res.ok) return redirect('/login')
    return { tasks: result.tasks.map((task: Task) => ({...task, dueDate: new Date(task.dueDate)})) }
}

export default function Layout(){

    const { setTasks } = useContext(taskContext)
    const { tasks } = useLoaderData() as { tasks: Task[] }

    useEffect(() => {
        setTasks(tasks)
    }, [setTasks, tasks])


    return(

        <>
            <Header />
            <Outlet />
        </>
    )
}