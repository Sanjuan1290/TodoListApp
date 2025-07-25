import { useContext, useRef } from "react"
import { IoMdClose } from "react-icons/io";
import type { Task } from "../model";
import { taskContext } from "../App";

type Props = {
    setIsTaskEditable: React.Dispatch<React.SetStateAction<boolean>>,
    task: Task,
    setTask: React.Dispatch<React.SetStateAction<Task>>
}

export default function EditTask({ setIsTaskEditable, task, setTask } : Props){
    const {setTasks} = useContext(taskContext)

    const titleRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const priorityRef = useRef<HTMLSelectElement>(null)
    const dueDateRef = useRef<HTMLInputElement>(null)
    const statusRef = useRef<HTMLSelectElement>(null)

    const formatDate = (date: Date) => date.toISOString().split("T")[0]; 

    async function updateTask(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        const token = JSON.parse(localStorage.getItem('token') || JSON.stringify(''))
        
        const response = await fetch('https://todolistapp-server-hocs.onrender.com/editTask', {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        const result = await response.json()

        if (!response.ok) {
            console.error(result.message)
            return
        }
        
        if (!result.tasks || !Array.isArray(result.tasks)) {
            console.error('Invalid tasks data')
            return
        }

        setTasks(result.tasks.map((task: Task) => ({...task, dueDate: new Date(task.dueDate)})))
        setIsTaskEditable(false)
    }

    return(
        <form onSubmit={updateTask} className="text-white flex flex-col gap-2 absolute top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 bg-[rgb(30,40,56)] p-4 rounded-md">

            <div className="flex justify-between items-center">
                <h3 className="font-bold">Edit Task</h3>
                <IoMdClose onClick={()=>{setIsTaskEditable(false)}} className="h-5 w-5 cursor-pointer transition-colors duration-200 ease-in-out hover:text-gray-400"/>
            </div>

            <div className="flex flex-col gap-4">
                <label>
                    <p className="text-[11px] tracking-wider font-bold">Title</p>
                    <input ref={titleRef} type="text" value={task.title} onChange={()=>{setTask(prev => ({...prev, title: titleRef.current!.value}))}} className="text-[12px] px-2 py-1 tracking-wide border border-gray-400 rounded-[3px] bg-transparent w-[400px]" />
                </label>

                <label>
                    <p className="text-[11px] tracking-wider font-bold">Description</p>
                    <textarea ref={descriptionRef} value={task.description} 
                    onChange={()=>{setTask(prev => ({...prev, description: descriptionRef.current!.value}))}} className="text-[12px] px-2 py-1 tracking-wide border border-gray-400 rounded-[3px] bg-transparent w-[400px]" />
                </label>

                <label>
                    <p className="text-[11px] tracking-wider font-bold">Priority</p>
                    <select ref={priorityRef} name="" id="" value={task.priority} 
                    onChange={()=>{setTask(prev => ({...prev, priority: priorityRef.current!.value as 'Low' | 'High'}))}} className="cursor-pointer text-[12px] px-2 py-1 tracking-wide border border-gray-400 rounded-[3px] bg-transparent w-[400px]">
                        <option value="Low" className="text-black">Low</option>
                        <option value="High" className="text-black">High</option>
                    </select>
                </label>

                <label>
                    <p className="text-[11px] tracking-wider font-bold">Due Date</p>
                    <input ref={dueDateRef} value={formatDate(task.dueDate)} type="date"
                        onKeyDown={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                        onChange={()=>{(setTask(prev => ({...prev, dueDate: new Date(dueDateRef.current!.value)})))}}
                        className=" text-[12px] px-2 py-1 tracking-wide border border-gray-400 rounded-[3px] bg-transparent w-[400px]"/>
                </label>

                <label>
                    <p className="text-[11px] tracking-wider font-bold">Status</p>
                    <select ref={statusRef} name="" id="" value={task.status} onChange={()=>{setTask(prev => ({...prev, status: statusRef.current!.value as "Pending" | "Completed"}))}} className="cursor-pointer text-[12px] px-2 py-1 tracking-wide border border-gray-400 rounded-[3px] bg-transparent w-[400px]">
                        <option value="Pending" className="text-black">Pending</option>
                        <option value="Completed" className="text-black">Completed</option>
                    </select>
                </label>

                <div className="text-end">
                    <button className="text-[12px] px-3 py-1.5 rounded-[3px] bg-[rgb(78,59,245)] transition-colors duration-300 ease-in-out hover:bg-[rgb(196,189,255)] hover:text-gray-900">Update Task</button>
                </div>
            </div>

        </form>
    )
}