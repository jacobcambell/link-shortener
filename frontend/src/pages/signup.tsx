import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import '../styles/signup.scss'
import { gql, useMutation } from '@apollo/client'
import { FaSpinner } from 'react-icons/fa'

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

    return (
        <div className="signup">
            <Navbar />

            <div className="form">
                <img src={`logo.png`} alt="Logo" className='logo' />

                <p className="title">Sign Up</p>
                <p className="desc">Get access to features like analytics and redirection mangement. 100% free.</p>

                <input onChange={e => { setEmail(e.target.value) }} type="text" className="field" placeholder="Email" />
                <input onChange={e => { setPassword(e.target.value) }} type="password" className="field" placeholder="Password" />
                <input onChange={e => { setConfirmPassword(e.target.value) }} type="password" className="field" placeholder="Confirm Password" />

                {
                    data?.registerAccount && <p className="error">{data?.registerAccount.errorMessage}</p>
                }

                <button onClick={handleClick} className="btn-signup">{loading ? <FaSpinner className="spinner" /> : 'Sign Up'}</button>
            </div>
        </div>
    )
}
