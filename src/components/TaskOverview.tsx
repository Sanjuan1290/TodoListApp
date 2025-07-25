import { TbCalendarDue } from "react-icons/tb";
import { FaCircleExclamation } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useContext } from "react";
import { taskContext } from "../App";

export default function TaskOverview(){
    const { tasks, toggleDarkMode } = useContext(taskContext)
    const getPastDues = () => {
        const pastDuesArr = tasks.filter(task => new Date(task.dueDate) < new Date())
        return pastDuesArr.length
    }
    const getHighPriorities = () => {
        const highPriorityArr = tasks.filter(task => task.priority === 'High')
        return highPriorityArr.length
    } 
    const getPendings = () => {
        const pendingsArr = tasks.filter(task => task.status === 'Pending')
        return pendingsArr.length
    }
    const getCompleted = () => {
        const completedArr = tasks.filter(task => task.status === 'Completed')
        return completedArr.length
    }

    return(
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

            <div className={`flex gap-2 items-center py-4 px-3 rounded-md shadow-sm shadow-gray-400 flex-1 ${toggleDarkMode ? 'bg-[rgb(30,40,56)] text-white' : 'bg-white text-black'} font-bold`}>
                <TbCalendarDue className="text-yellow-500 w-5 h-5"/>
                <p className={`text-[14px] ${toggleDarkMode ? 'text-white' : 'text-black'}`}>Past Due ({getPastDues()})</p>
            </div>

            <div className={`flex gap-2 items-center py-4 px-3 rounded-md shadow-sm shadow-gray-400 flex-1 ${toggleDarkMode ? 'bg-[rgb(30,40,56)] text-white' : 'bg-white text-black'} font-bold`}>
                <FaCircleExclamation className="text-red-400 w-[17px] h-[17px]"/>
                <p className={`text-[14px] ${toggleDarkMode ? 'text-white' : 'text-black'}`}>High Priority ({getHighPriorities()})</p>
            </div>

            <div className={`flex gap-2 items-center py-4 px-3 rounded-md shadow-sm shadow-gray-400 flex-1 ${toggleDarkMode ? 'bg-[rgb(30,40,56)] text-white' : 'bg-white text-black'} font-bold`}>
                <FaRegClock className="text-blue-500 w-[17px] h-[17px]"/>
                <p className={`text-[14px] ${toggleDarkMode ? 'text-white' : 'text-black'}`}>Pending ({getPendings()})</p>
            </div>

            <div className={`flex gap-2 items-center py-4 px-3 rounded-md shadow-sm shadow-gray-400 flex-1 ${toggleDarkMode ? 'bg-[rgb(30,40,56)] text-white' : 'bg-white text-black'} font-bold`}>
                <IoMdCheckmarkCircleOutline className="text-green-500 w-[19px] h-[19px]"/>
                <p className={`text-[14px] ${toggleDarkMode ? 'text-white' : 'text-black'}`}>Completed ({getCompleted()})</p>
            </div>

        </div>
    )
}