import { gql, useMutation } from '@apollo/client';
import { navigate } from 'gatsby-link';
import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import Navbar from '../components/Navbar/Navbar';
import logo from '../images/logo.png';

const LOGIN_QUERY = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            ... on Error {
                errorMessage
            }

            ... on JWT {
                token
            }
        }
    }
`
export default function login() {

    const [tryLogin, { data, loading }] = useMutation(LOGIN_QUERY, {
        onCompleted: (data) => {
            if (data.login.errorMessage) {
                setError(data.login.errorMessage)
            }

            if (data.login.token) {
                // Save JWT
                localStorage.setItem('access_token', data.login.token)

                navigate('/dashboard')
            }
        }
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const inputStyle = 'w-full border-cadetgrey border-0 border-b block my-3 py-2 text-oxfordblue select-none focus:outline-none placeholder-cadetgrey';

    const handleClick = () => {
        setError('')

        tryLogin({
            variables: {
                email,
                password
            }
        })
    }

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

                {
                    error.length > 0 &&
                    <p className="text-red-500">{error}</p>
                }

                <button onClick={handleClick} className="bg-azure my-3 px-3 py-2 w-full text-white">{loading ? <FaSpinner className="spinner m-auto" /> : 'Login'}</button>
            </div>
        </div>
    )
}
