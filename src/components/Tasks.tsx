import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useContext, useState } from "react";
import { taskContext } from "../App";


import type { Task } from "../model";
import EditTask from "./EditTask";

export default function Tasks(){

    const { tasks, setTasks } = useContext(taskContext)
    const [ isTaskEditable, setIsTaskEditable] = useState(false)
    const [task, setTask] = useState({} as Task)
    const [filter, setFilter] = useState('All')

    async function deleteTask(taskId: string){
        const token = JSON.parse(localStorage.getItem('token') || JSON.stringify(''))

        const response = await fetch('http://localhost:3000/api/v1/deleteOneTask', {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ taskId })
        })

        const result = await response.json()

        if(!response.ok){
            console.error(result.message);
            return
        }

        setTasks(result.tasks.map((task: Task) => ({ ...task,  dueDate: new Date(task.dueDate)})))
    }


    async function editTask(userTask: Task){
        //display edittableTask
        setIsTaskEditable(true)
        setTask(userTask)
    }

    async function toggleTask(taskId: string, currentStatus: 'Pending' | 'Completed'){
        const token = JSON.parse(localStorage.getItem('token') || JSON.stringify(''))
        const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending' 
        
        const response = await fetch('http://localhost:3000/api/v1/toggleTask', {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ taskId, newStatus })
        })
        const result = await response.json()

        console.log(result);

        setTasks(result.tasks.map((task: Task) => ({ ...task,  dueDate: new Date(task.dueDate)})))
    }

    return(
        <>
            <div className="flex gap-2 text-gray-700 text-[13px]">
                <button onClick={()=>{setFilter('All')}} className={`${filter === 'All' ? 'bg-[rgb(78,58,244)] text-white' : 'bg-gray-100'}  px-3 py-1 rounded-[3px] font-bold`}>All</button>
                <button onClick={()=>{setFilter('Pending')}} className={`${filter === 'Pending' ? 'bg-[rgb(78,58,244)] text-white' : 'bg-gray-100'}  px-3 py-1 rounded-[3px] font-bold`}>Pending</button>
                <button onClick={()=>{setFilter('Completed')}} className={`${filter === 'Completed' ? 'bg-[rgb(78,58,244)] text-white' : 'bg-gray-100'}  px-3 py-1 rounded-[3px] font-bold`}>Completed</button>
            </div>

            <div className="relative flex flex-col-reverse gap-3">
                {
                    tasks.map((task, index) => {
                        const status = task.status === filter || filter === 'All'

                        return status && <div key={index} className="bg-[rgb(30,40,56)] flex gap-2 px-3 py-4 items-start rounded-md">

                            <IoMdCheckmarkCircleOutline onClick={()=>{toggleTask(task._id as string, task.status as 'Pending' | 'Completed')}} className={`${task.status === "Completed" ? 'text-green-600' : 'text-gray-300'} cursor-pointer w-[18px] h-[18px] mt-[2px]`}/>

                            <div className="flex flex-col gap-1 flex-1">
                                <p className="text-gray-100 font-bold">{task.title}</p>
                                <p className="text-gray-300 text-[14px]">{task.description}</p>
                                
                                <div className="flex items-center gap-3 text-[14px]">
                                    <p className={`${task.priority === 'Low' ? 'text-green-500' : 'text-red-400'} font-bold`}>{task.priority}</p>
                                    <div className="flex gap-1 items-center">
                                        <FaRegClock className="text-blue-500 w-[17px] h-[17px] "/> 
                                        <p className="text-gray-300">{task.dueDate.toLocaleDateString('en-GB')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 text-white mt-[2px]">
                                <MdOutlineModeEdit onClick={()=>{editTask(task)}} className="cursor-pointer transition-colors duration-200 ease-in-out hover:text-gray-300"/>
                                <RiDeleteBin5Fill onClick={()=>{deleteTask(task._id as string)}} className="cursor-pointer transition-colors duration-200 ease-in-out hover:text-gray-300"/>
                            </div>
                        </div>
                    })
                }

                {
                    isTaskEditable ? <EditTask  setIsTaskEditable={setIsTaskEditable} task={task} setTask={setTask}/> : ''
                }
            </div>

        </>
    )
}