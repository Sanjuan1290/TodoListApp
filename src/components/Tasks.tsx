import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useContext } from "react";
import { taskContext } from "../App";


export default function Tasks(){

    const { tasks } = useContext(taskContext)

    return(
        <>
            <div className="flex gap-2 text-gray-700 text-[13px]">
                <button className="transition-colors duration-300 ease-in-out hover:bg-gray-500 hover:text-gray-200 bg-gray-100 px-3 py-1 rounded-[3px] font-bold">All</button>
                <button className="transition-colors duration-300 ease-in-out hover:bg-gray-500 hover:text-gray-200 bg-gray-100 px-3 py-1 rounded-[3px] font-bold">Pending</button>
                <button className="transition-colors duration-300 ease-in-out hover:bg-gray-500 hover:text-gray-200 bg-gray-100 px-3 py-1 rounded-[3px] font-bold">Completed</button>
            </div>

            <div className="flex flex-col-reverse gap-3">
                {
                    tasks.map((task, index) => (
                        <div key={index} className="bg-[rgb(30,40,56)] flex gap-2 px-3 py-4 items-start rounded-md">

                            <IoMdCheckmarkCircleOutline className="text-gray-300 cursor-pointer w-[18px] h-[18px] mt-[2px]"/>

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
                                <MdOutlineModeEdit className="cursor-pointer transition-colors duration-200 ease-in-out hover:text-gray-300"/>
                                <RiDeleteBin5Fill className="cursor-pointer transition-colors duration-200 ease-in-out hover:text-gray-300"/>
                            </div>

                        </div>
                    ))
                }
            </div>

        </>
    )
}