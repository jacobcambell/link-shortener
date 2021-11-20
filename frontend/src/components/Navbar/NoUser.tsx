import React from 'react'
import { Link } from 'gatsby'

export default function NoUser() {
    return (
        <div className="flex flex-row text-oxfordblue items-stretch">
            <Link to='/signup' className="bg-azure flex items-center text-white px-3 rounded-lg">Get Started</Link>
            <Link to='/login' className="flex items-center mx-6">Log In</Link>
        </div>
    )
}
