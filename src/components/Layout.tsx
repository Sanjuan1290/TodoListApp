import { Outlet, redirect } from "react-router-dom"
import Header from './Header'

export async function loader(){
    const savedToken = localStorage.getItem('token') || JSON.stringify('')
    const token = JSON.parse(savedToken)

    if (!token) return redirect('/login') 

    const res = await fetch('http://localhost:3000/api/v1/verify', {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    })

    const result = await res.json()

    if(!res.ok){
        console.error(result.message);
    }

    console.log(result.tasks);

    // if (!res.ok) return redirect('/login')
    return null
}

export default function Layout(){

    return(

        <>
            <Header />
            <Outlet />
        </>
    )
}