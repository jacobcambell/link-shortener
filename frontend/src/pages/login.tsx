import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar';
import { FaSpinner } from 'react-icons/fa'
import logo from '../images/logo.png'

export default function login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const inputStyle = 'w-full border-cadetgrey border-0 border-b block my-3 py-2 text-oxfordblue select-none focus:outline-none placeholder-cadetgrey';

    return (
        <div>
            <Navbar />

            <div className="flex items-center flex-col justify-center pb-8 text-oxfordblue w-11/12 lg:w-3/4 2xl:w-1/3 m-auto">
                <img src={logo} alt="Logo" className='w-20 my-4' />

                <p className="text-oxfordblue text-2xl mb-3">Log In</p>

                <input onChange={e => { setEmail(e.target.value) }} type="text" placeholder="Email"
                    className={inputStyle}
                />
                <input onChange={e => { setPassword(e.target.value) }} type="password" placeholder="Password"
                    className={inputStyle}
                />

                {/* {
                    data?.registerAccount && <p className="text-red-500 mb-3">{data?.registerAccount.errorMessage}</p>
                } */}

                <button className="bg-azure my-3 px-3 py-2 w-full text-white">{true ? <FaSpinner className="spinner m-auto" /> : 'Login'}</button>
            </div>
        </div>
    )
}
