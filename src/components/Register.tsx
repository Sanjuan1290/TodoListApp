import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

export default function Register(){

    const [isSuccess, setIsSuccess] = useState(true)
    const [registerResult, setRegisterResult] = useState('')
    const navigate = useNavigate()

    function displayMessage(message: string){
            setRegisterResult(message)
            setIsSuccess(false)
            setTimeout(()=>{
                setIsSuccess(true)
            }, 3000)
    }

    async function register(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)
        if(!formData) {
            displayMessage("Something wen't wrong! try again later. 😫")
            return 
        }

        const fullName = formData.get('fullName') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string

        if(!fullName.trim()){
            displayMessage('Please Enter your Full Name. 📛')
            return 
        }
        if(!email.trim()){
            displayMessage('Please Enter your Email. ✉️')
            return 
        }
        if(!password.trim()){
            displayMessage('Please Enter your Password. 🔑')
            return 
        }
        if(!confirmPassword.trim()){
            displayMessage('Please Re-Enter your Password. 🔑')
            return 
        }

        if(password !== confirmPassword) {
            displayMessage('Password and Confirm Password is not the same! Try again 🧒.')
            return
        }

        const response = await fetch('https://todolistapp-server-hocs.onrender.com/api/v1/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullName, email, password })
        })

        const result = await response.json()

        if (!response.ok) {
            displayMessage(result.message || 'Registration failed.')
            return
        }

        navigate('/')


    }

    return(
        <form onSubmit={register} className="flex flex-col absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center gap-5">
            <h1 className="text-white font-bold text-[26px] tracking-wide">Create your account</h1>
            {
                !isSuccess ? <p className="text-red-400">{registerResult}</p> : ''
            }
            <div className="flex flex-col">
                <input type="text" autoComplete="fullName" name="fullName" placeholder="Full name"  className="rounded-t-md bg-transparent border border-gray-400 text-[13px] px-2 py-1.5 text-white w-[450px] placeholder:text-gray-500"/>
                <input type="text" autoComplete="email" name="email" placeholder="Email address"  className=" mt-[-1px] bg-transparent border border-gray-400 text-[13px] px-2 py-1.5 text-white w-[450px] placeholder:text-gray-500"/>
                <input type="password" autoComplete="password" name="password" placeholder="Password"  className=" bg-transparent border border-gray-400 text-[13px] px-2 py-1.5 text-white w-[450px] mt-[-1px] placeholder:text-gray-500"/>
                <input type="password" autoComplete="confirmPassword" name="confirmPassword" placeholder="Confirm password"  className="rounded-b-md mt-[-1px] bg-transparent border border-gray-400 text-[13px] px-2 py-1.5 text-white w-[450px] placeholder:text-gray-500"/>
            </div>

            <button className="bg-[rgb(78,57,247)] text-white text-[13px] rounded-md py-[6px] transition-colors duration-300 ease-in-out hover:bg-[rgb(175,166,239)] hover:text-gray-800">Create account</button>
            <p className="text-gray-200 text-[13px]">Don't have an account? <NavLink to='/login' className="text-[rgb(78,57,247)] hover:text-[rgb(178,157,247)]">Sign in</NavLink></p>
        </form>
    )
}