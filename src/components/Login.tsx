import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

export default function Login(){

    const [isSuccess, setIsSuccess] = useState(true)
    const [loginResult, setLoginResult] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        localStorage.removeItem('token')
    }, [])

    async function login(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        try{
            const response = await fetch('https://todolistapp-server-hocs.onrender.com/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const result = await response.json();
            if(!response.ok) {
                setIsSuccess(false)
                setTimeout(()=>{
                    setIsSuccess(true)
                }, 3000)
                setLoginResult(result.message)
            };

            if(response.ok) {
                localStorage.setItem('token', JSON.stringify(result.token))
                navigate('/')
            }

        }catch(error){
            console.error(error);
            console.error('Login Failed!');
        }
    }

    return(
        <form onSubmit={login} className="flex flex-col absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center gap-5">
            {
                !isSuccess ? <p className="text-red-400">{loginResult}</p> : ''
            }
            <h1 className="text-white font-bold text-[26px] tracking-wide">Sign in to your account</h1>

            <div className="flex flex-col">
                <input type="text" name="email" placeholder="Email address" autoComplete="username" className="rounded-t-md bg-transparent border border-gray-400 text-[13px] px-2 py-1.5 text-white w-[450px] placeholder:text-gray-500"/>
                <input type="password" name="password" placeholder="Password" autoComplete="current-password"  className="rounded-b-md mt-[-1px] bg-transparent border border-gray-400 text-[13px] px-2 py-1.5 text-white w-[450px] placeholder:text-gray-500"/>
            </div>

            <button className="bg-[rgb(78,57,247)] text-white text-[13px] rounded-md py-[6px] transition-colors duration-300 ease-in-out hover:bg-[rgb(175,166,239)] hover:text-gray-800">Sign in</button>
            <p className="text-gray-200 text-[13px]">Don't have an account? <NavLink to='/register' className="text-[rgb(78,57,247)] hover:text-[rgb(178,157,247)]">Sign up</NavLink></p>
        </form>
    )
}