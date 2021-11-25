import React from 'react'
import Analytics from '../components/Analytics/GlobalAnalytics'
import Navbar from '../components/Navbar/Navbar'
import LinkList from '../components/Analytics/LinkList'

export default function Dashboard() {
    return (
        <div>
            <Navbar></Navbar>
            <Analytics></Analytics>
            <LinkList></LinkList>
        </div>
    )
}
