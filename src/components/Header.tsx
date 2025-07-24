import { MdOutlineLightMode, MdLogout  } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Header(){

    const[showValidation, setShowValidation] = useState(false)
    const navigate = useNavigate()

    function logout(){
        // in Login.tsx I clear the localStorage for 'token'
        navigate('/login')
    }

    return(
        <header className="flex items-center p-4 bg-[rgb(32,40,56)] text-white">
            <h1 className="font-bold text-xl flex-1">TaskMaster</h1>

            <div className="flex gap-5">
                <MdOutlineLightMode className="w-5 h-5 cursor-pointer transition-colors duration-200 ease-in-out hover:text-gray-300"/>
                <CgProfile className="w-5 h-5 cursor-pointer transition-colors duration-200 ease-in-out hover:text-gray-300"/>
                <MdLogout onClick={()=>{setShowValidation(true)}} className="w-5 h-5 cursor-pointer transition-colors duration-200 ease-in-out hover:text-gray-300"/>
            </div>
            
            {
                showValidation ? 
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.22)] flex items-center justify-center z-20 ">
                    <div className="flex flex-col gap-10 bg-white p-4 rounded-md">
                        <h1 className="text-black">Are you sure, you want to logout?</h1>
                        <div className="flex gap-2 justify-between">
                            <button onClick={()=>{setShowValidation(false)}} className="bg-gray-700 text-white py-1 px-4 rounded-[3px] cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-400 hover:text-gray-800">cancel</button>
                            <button onClick={logout} className="bg-gray-700 text-white py-1 px-4 rounded-[3px] cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-400 hover:text-gray-800">logout</button>
                        </div>
                    </div>
                </div> : ''
            }
        </header>
    )
}