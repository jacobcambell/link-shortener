import React, { useContext } from 'react'
import { jwt_context } from '../JWT_Wrapper'
import { navigate } from 'gatsby-link'

export default function Logout() {

    const { setJWT } = useContext(jwt_context)

    const handleLogout = () => {
        setJWT('')

        navigate('/login')
    }

    return (
        <button onClick={handleLogout} className="text-red-500">
            Logout
        </button>
    )
}
