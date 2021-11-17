import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { gql, useMutation } from '@apollo/client'
import { FaSpinner } from 'react-icons/fa'
import logo from '../images/logo.png'

const REGISTER_ACCOUNT = gql`
    mutation register($email: String!, $password: String!) {
      registerAccount(email: $email, password: $password) {
        ... on JWT {
          token
        }

        ... on Error {
          errorMessage
        }
      }
    }
  `

export default function Signup() {

    const [registerAccount, { data, loading }] = useMutation(REGISTER_ACCOUNT, {
        onCompleted: (data) => {
            if (data.registerAccount.token) {
                // Save the returned JWT to localStorage
                localStorage.setItem('access_token', data.registerAccount.token)
            }
        }
    });

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleClick = () => {
        if (password != confirmPassword) {
            alert('Please ensure your passwords match');
            return;
        }

        registerAccount({
            variables: {
                email,
                password
            }
        })
    }

    const inputStyle = 'w-full border-cadetgrey border-0 border-b block my-3 py-2 text-oxfordblue select-none focus:outline-none placeholder-cadetgrey';

    return (
        <div>
            <Navbar />

            <div className="flex items-center flex-col justify-center pb-8 text-oxfordblue w-11/12 lg:w-3/4 2xl:w-1/3 m-auto">
                <img src={logo} alt="Logo" className='w-20 my-4' />

                <p className="text-oxfordblue text-2xl mb-3">Sign Up</p>
                <p className="text-oxfordblue mb-10">Get access to features like analytics and redirection mangement. 100% free.</p>

                <input onChange={e => { setEmail(e.target.value) }} type="text" placeholder="Email"
                    className={inputStyle}
                />
                <input onChange={e => { setPassword(e.target.value) }} type="password" placeholder="Password"
                    className={inputStyle}
                />
                <input onChange={e => { setConfirmPassword(e.target.value) }} type="password" placeholder="Confirm Password"
                    className={inputStyle}
                />

                {
                    data?.registerAccount && <p className="text-red-500 mb-3">{data?.registerAccount.errorMessage}</p>
                }

                <button onClick={handleClick} className="bg-azure my-3 px-3 py-2 w-full text-white">{loading ? <FaSpinner className="spinner m-auto" /> : 'Sign Up'}</button>
            </div>
        </div>
    )
}
