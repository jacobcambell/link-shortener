import React from 'react'
import { Link } from 'gatsby'
import './Navbar.scss'

export default function Navbar() {
    return (
        <div className='navbar'>
            <Link to='/' className='logo'>
                <img src={`logo.png`} alt="Logo" className='logo' />
            </Link>
        </div>
    )
}
