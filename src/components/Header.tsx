import { MdOutlineLightMode, MdLogout  } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";


export default function Header(){

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
                <MdLogout onClick={logout} className="w-5 h-5 cursor-pointer transition-colors duration-200 ease-in-out hover:text-gray-300"/>
            </div>
        </header>
    )
}