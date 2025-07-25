
import { defer, Await, useLoaderData} from 'react-router-dom'
import { Suspense } from 'react'

type UserProfile = {
    fullName: string,
    email: string
}

export async function loader(){

    const token = JSON.parse(localStorage.getItem('token') || JSON.stringify(''))

    const response = await fetch('http://localhost:3000/api/v1/getProfile', {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    const result = await response.json()
    
    if(!response.ok){
        console.log(result.message);
        return
    }

    return defer({userProfile: result.user})

}

export default function Profile(){
    const { userProfile } = useLoaderData() as { userProfile: Promise<UserProfile> }

    function editProfile(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
    }

    return(
        <Suspense fallback={<h1>Profile loading...</h1>}>
            <Await resolve={userProfile}>
                {
                    (user) => (
                        <form onSubmit={editProfile} className="flex flex-col gap-4 text-white bg-[rgb(30,41,57)]  min-w-fit max-w-[600px] p-4 rounded-md m-auto mt-10">
                            <h1 className="text-[20px] font-bold">Profile Settings</h1>

                            <label>
                                <p className="text-[13px] font-bold tracking-wide">Name</p>
                                <input type="text" value={user.fullName} className="bg-transparent border border-gray-400 rounded-md px-2 py-[2px] w-[100%] max-w-[600px] min-w-[300px]" />
                            </label>

                            <label>
                                <p className="text-[13px] font-bold tracking-wide">Email (cannot be changed)</p>
                                <input type="text" value={user.email} disabled className="bg-[rgba(255,255,255,0.19)] border border-gray-400 rounded-md px-2 py-[2px] w-[100%] max-w-[600px] min-w-[300px]" />
                            </label>

                            <div className="h-[1px] w-[100%] bg-gray-400"></div>

                            <h1 className="text-[16px] font-bold">Change Password</h1>

                            <label>
                                <p className="text-[13px] font-bold tracking-wide">Current Password</p>
                                <input type="text" className="bg-transparent border border-gray-400 rounded-md px-2 py-[2px] w-[100%] max-w-[600px] min-w-[300px]" />
                            </label>

                            <label>
                                <p className="text-[13px] font-bold tracking-wide">New Password</p>
                                <input type="text" className="bg-transparent border border-gray-400 rounded-md px-2 py-[2px] w-[100%] max-w-[600px] min-w-[300px]" />
                            </label>

                            <label>
                                <p className="text-[13px] font-bold tracking-wide">Confirm New Password</p>
                                <input type="text" className="bg-transparent border border-gray-400 rounded-md px-2 py-[2px] w-[100%] max-w-[600px] min-w-[300px]" />
                            </label>

                            <div className="text-right">
                                <button className="bg-[rgb(74,62,183)] px-3 py-2 text-[13px] text-gray-200 font-bold cursor-pointer transition-colors duration-200 ease-in-out hover:bg-[rgb(124,111,242)] hover:text-gray-700">Save Changes</button>
                            </div>
                        </form>
                    )
                }
            </Await>
        </Suspense>
    )
}