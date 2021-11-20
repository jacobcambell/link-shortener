import React from 'react'
import { Link } from 'gatsby'
import logo from '../../images/logo.png'
import NoUser from './NoUser'
import Logout from './Logout'

export default function Navbar() {

    return (
        <div className='bg-white flex items-stretch  justify-between h-16 py-3 px-6'>
            <Link to='/' className=''>
                <img src={logo} alt="Logo" className='h-full' />
            </Link>

            {
                // JWT is present, user is logged in
                localStorage.getItem('access_token') !== null &&
                <Logout></Logout>
            }
            {
                // No JWT set, not logged in
                localStorage.getItem('access_token') === null &&
                <NoUser></NoUser>
            }
        </div>
    )
}
