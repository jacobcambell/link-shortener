import React, { useContext } from 'react'
import { Link } from 'gatsby'
import logo from '../../images/logo.png'
import { jwt_context } from '../JWT_Wrapper'
import NoUser from './NoUser'
import Logout from './Logout'

export default function Navbar() {
    const { jwt } = useContext(jwt_context)

    return (
        <div className='bg-white flex items-stretch  justify-between h-16 py-3 px-6'>
            <Link to='/' className=''>
                <img src={logo} alt="Logo" className='h-full' />
            </Link>

            {
                // JWT is present, user is logged in
                jwt.length > 0 &&
                <Logout></Logout>
            }
            {
                // No JWT set, not logged in
                jwt.length === 0 &&
                <NoUser></NoUser>
            }
        </div>
    )
}
