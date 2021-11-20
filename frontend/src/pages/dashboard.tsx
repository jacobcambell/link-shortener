import React, { useContext } from 'react'
import Analytics from '../components/Analytics/Analytics'
import { jwt_context } from '../components/JWT_Wrapper'
import Navbar from '../components/Navbar/Navbar'

export default function Dashboard() {

    const { jwt } = useContext(jwt_context)
    return (
        <div>
            <Navbar></Navbar>
            <Analytics></Analytics>
        </div>
    )
}
