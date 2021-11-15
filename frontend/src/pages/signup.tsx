import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import '../styles/signup.scss'

export default function Signup() {
    return (
        <div className="signup">
            <Navbar />

            <div className="form">
                <img src={`logo.png`} alt="Logo" className='logo' />

                <p className="title">Sign Up</p>
                <p className="desc">Get access to features like analytics and redirection mangement. 100% free.</p>

                <input type="text" className="field" placeholder="Email" />
                <input type="password" className="field" placeholder="Password" />
                <input type="password" className="field" placeholder="Confirm Password" />

                <button className="btn-signup">Sign Up</button>
            </div>
        </div>
    )
}
