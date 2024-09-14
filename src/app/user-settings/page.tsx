// "use client"
// import GetUserByEmail from '@/services/getUserByEmail'
// import { useSession } from 'next-auth/react'
// import React, { useEffect, useState } from 'react'
// import SettingsForm from './components/SettingsForm'
// import DeleteAccountForm from './components/DeleteAccountForm'
// import DeleteAccountButton from './components/DeleteAccountButton'


// export default function UserSettings() {
//     const { data: session } = useSession()
//     const [user, setUser] = useState({})
//     const [error, setError] = useState("")

//     useEffect (() => {
//         const fetchUser = async () => {
//             try {
//                 const userEmail = session?.user?.email
//                 const response = await GetUserByEmail(userEmail)
//                 setUser(response)
//             } catch(error) {
//                 setError("Failed to load User, please reload the page")
//             }
//         };
//         fetchUser()
//     }, [])

//     return (
//         <div className='m-4 mt-20'>
//             <SettingsForm user={user} />
//             <DeleteAccountButton user={user} />
//         </div>
//     )
// }

import { getServerSession } from "next-auth";
import GetUserByEmail from '@/services/getUserByEmail';
import SettingsForm from './components/SettingsForm';
import DeleteAccountButton from './components/DeleteAccountButton';

export default async function UserSettings() {
    const session = await getServerSession();
    
    let user = null;
    let error = "";

    if (!session?.user?.email) {
        error = "No session found, please log in.";
    } else {
        try {
            const userEmail = session.user.email;
            user = await GetUserByEmail(userEmail);
        } catch (err) {
            error = "Failed to load User, please reload the page.";
        }
    }

    return (
        <div className="m-4 mt-20">
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    <SettingsForm user={user} />
                    <DeleteAccountButton user={user} />
                </>
            )}
        </div>
    );
}
