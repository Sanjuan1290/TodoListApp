import { TbCalendarDue } from "react-icons/tb";
import { FaCircleExclamation } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


export default function TaskOverview(){

    return(
        <div className="flex justify-between gap-5">

            <div className="flex gap-2 items-center py-4 px-3 rounded-md bg-[rgb(30,40,56)] flex-1 text-white font-bold">
                <TbCalendarDue className="text-yellow-500 w-5 h-5"/>
                <p className="text-[14px]">Past Due (1)</p>
            </div>

            <div className="flex gap-2 items-center py-4 px-3 rounded-md bg-[rgb(30,40,56)] flex-1 text-white font-bold">
                <FaCircleExclamation className="text-red-400 w-[17px] h-[17px]"/>
                <p className="text-[14px]">High Priority (1)</p>
            </div>

            <div className="flex gap-2 items-center py-4 px-3 rounded-md bg-[rgb(30,40,56)] flex-1 text-white font-bold">
                <FaRegClock className="text-blue-500 w-[17px] h-[17px]"/>
                <p className="text-[14px]">Pending (1)</p>
            </div>

            <div className="flex gap-2 items-center py-4 px-3 rounded-md bg-[rgb(30,40,56)] flex-1 text-white font-bold">
                <IoMdCheckmarkCircleOutline className="text-green-500 w-[19px] h-[19px]"/>
                <p className="text-[14px]">Completed (0)</p>
            </div>

        </div>
    )
}