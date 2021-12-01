import React from 'react'
import { Link } from 'gatsby'
import logo from '../../images/logo.png'
import NoUser from './NoUser'
import Logout from './Logout'
import { FaPlus } from 'react-icons/fa'

export default function Navbar() {

    return (
        <div className='bg-white flex items-stretch  justify-between h-16 py-3 px-6'>
            <Link to='/' className=''>
                <img src={logo} alt="Logo" className='h-full' />
            </Link>

            {
                // JWT is present, user is logged in
                localStorage.getItem('access_token') !== null &&
                <div className="flex items-center">
                    <Link to="/create-link" className='bg-azure text-white py-1 px-2 mr-3 flex items-center'><FaPlus className="inline mr-1" /> Create Link</Link>
                    <Logout></Logout>
                </div>
            }
            {
                // No JWT set, not logged in
                localStorage.getItem('access_token') === null &&
                <NoUser></NoUser>
            }
        </div>
    )
}
