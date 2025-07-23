import { NavLink } from "react-router-dom"

export default function Login(){
    return(
        <form className="flex flex-col absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center gap-5">
            <h1 className="text-white font-bold text-[26px] tracking-wide">Sign in to your account</h1>

            <div className="flex flex-col">
                <input type="text" name="text" placeholder="Email address"  className="rounded-t-md bg-transparent border border-gray-400 text-[13px] px-2 py-1.5 text-white w-[450px] placeholder:text-gray-500"/>
                <input type="passwrod" name="passwrod" placeholder="Password"  className="rounded-b-md mt-[-1px] bg-transparent border border-gray-400 text-[13px] px-2 py-1.5 text-white w-[450px] placeholder:text-gray-500"/>
            </div>

            <button className="bg-[rgb(78,57,247)] text-white text-[13px] rounded-md py-[6px] transition-colors duration-300 ease-in-out hover:bg-[rgb(175,166,239)] hover:text-gray-800">Sign in</button>
            <p className="text-gray-200 text-[13px]">Don't have an account? <NavLink to='/register' className="text-[rgb(78,57,247)] hover:text-[rgb(178,157,247)]">Sign up</NavLink></p>
        </form>
    )
}