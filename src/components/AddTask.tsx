import { IoAddCircleOutline } from "react-icons/io5";


export default function AddTask(){

    return(
        <div className="flex justify-between items-center text-white">
            <h1 className="text-2xl font-bold">My Tasks</h1>
            <button className="flex items-center font-bol text-[13px] gap-2 py-1.5 px-2.5 rounded-[5px] bg-[rgb(78,59,245)] transition-colors duration-300 ease-in-out hover:bg-[rgb(196,189,255)] hover:text-gray-900">
                <IoAddCircleOutline className="w-5 h-5"/>
                Add Task
            </button>
        </div>
    )
}