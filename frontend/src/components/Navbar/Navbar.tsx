import React from 'react'
import { Link } from 'gatsby'

export default function Navbar() {
    return (
        <div className='bg-white flex items-stretch  justify-between h-16 py-3 px-6'>
            <Link to='/' className=''>
                <img src={`logo.png`} alt="Logo" className='h-full' />
            </Link>

            <div className="flex flex-row text-oxfordblue items-stretch">
                <Link to='/signup' className="bg-azure flex items-center text-white px-3 rounded-lg">Get Started</Link>
                <Link to='/login' className="flex items-center mx-6">Log In</Link>
            </div>
        </div>
    )
}
