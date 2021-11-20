import React from 'react'
import { navigate } from 'gatsby-link'

export default function Logout() {

    const handleLogout = () => {
        localStorage.removeItem('access_token')

        navigate('/login')
    }

    return (
        <button onClick={handleLogout} className="text-red-500">
            Logout
        </button>
    )
}
