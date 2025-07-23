import { useContext, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { taskContext } from "../App";

type Props = {
    setToggle: React.Dispatch<React.SetStateAction<boolean>>
}


export default function CreateTask({ setToggle } : Props){

    const titleRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const priorityRef = useRef<HTMLSelectElement>(null)
    const dueDateRef = useRef<HTMLInputElement>(null)
    const statusRef = useRef<HTMLSelectElement>(null)
    const { setTasks } = useContext(taskContext)

    function createTask(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        const title = titleRef.current ? titleRef.current.value : ''
        const description = descriptionRef.current ? descriptionRef.current.value : ''
        const priority = priorityRef.current ? priorityRef.current.value : ''
        const dueDate = dueDateRef.current ? dueDateRef.current.value : ''
        const status = statusRef.current ? statusRef.current.value : ''

        if(!title || !description || !priority || !dueDate || !status) {
            console.error('Please fill the fields');
            return
        }

        console.log(title, description, priority, dueDate, status);
        setToggle(false)
        setTasks(prev => [
        ...prev,
            {
                title,
                description,
                priority: priority as 'Low' | 'High',
                dueDate: new Date(dueDate),  // Convert string to Date
                status: status as 'Pending' | 'Completed'
            }
        ])

    }

    return(
        <form onSubmit={createTask} className="flex flex-col gap-2 absolute top-[10px] z-10 left-1/2 -translate-x-1/2 bg-[rgb(30,40,56)] p-4 rounded-md">

            <div className="flex justify-between items-center">
                <h3 className="font-bold">Create Task</h3>
                <IoMdClose onClick={()=>{setToggle(false)}} className="h-5 w-5 cursor-pointer transition-colors duration-200 ease-in-out hover:text-gray-400"/>
            </div>

            <div className="flex flex-col gap-4">
                <label>
                    <p className="text-[11px] tracking-wider font-bold">Title</p>
                    <input ref={titleRef} type="text" className="text-[12px] px-2 py-1 tracking-wide border border-gray-400 rounded-[3px] bg-transparent w-[400px]" />
                </label>

                <label>
                    <p className="text-[11px] tracking-wider font-bold">Description</p>
                    <textarea ref={descriptionRef} className="text-[12px] px-2 py-1 tracking-wide border border-gray-400 rounded-[3px] bg-transparent w-[400px]" />
                </label>

                <label>
                    <p className="text-[11px] tracking-wider font-bold">Priority</p>
                    <select ref={priorityRef} name="" id="" className="cursor-pointer text-[12px] px-2 py-1 tracking-wide border border-gray-400 rounded-[3px] bg-transparent w-[400px]">
                        <option value="Low" className="text-black">Low</option>
                        <option value="High" className="text-black">High</option>
                    </select>
                </label>

                <label>
                    <p className="text-[11px] tracking-wider font-bold">Due Date</p>
                    <input ref={dueDateRef} type="date"
                        onKeyDown={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                        className=" text-[12px] px-2 py-1 tracking-wide border border-gray-400 rounded-[3px] bg-transparent w-[400px]"/>
                </label>

                <label>
                    <p className="text-[11px] tracking-wider font-bold">Status</p>
                    <select ref={statusRef} name="" id="" className="cursor-pointer text-[12px] px-2 py-1 tracking-wide border border-gray-400 rounded-[3px] bg-transparent w-[400px]">
                        <option value="Pending" className="text-black">Pending</option>
                        <option value="Completed" className="text-black">Completed</option>
                    </select>
                </label>

                <div className="text-end">
                    <button className="text-[12px] px-3 py-1.5 rounded-[3px] bg-[rgb(78,59,245)] transition-colors duration-300 ease-in-out hover:bg-[rgb(196,189,255)] hover:text-gray-900">Create Task</button>
                </div>
            </div>

        </form>
    )
}