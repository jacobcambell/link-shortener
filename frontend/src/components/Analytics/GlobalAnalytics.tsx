import React, { useEffect, useState } from 'react'
import { IoEarthOutline, IoCalendarOutline } from 'react-icons/io5'
import { Bar } from 'react-chartjs-2'
import { gql, useQuery } from '@apollo/client'

const GET_ANALYTICS = gql`
    query analytics {
        globalAnalytics {
            date
            numClicks
        }
    }
  `

interface DateAnalytics {
    date: string;
    numClicks: number;
}

export default function Analytics() {

    // An array of DateAnalytics objects
    const [dates, setDates] = useState<DateAnalytics[]>([])

    // Total number of clicks for this user's account
    const [clickCount, setClickCount] = useState<number>(0)

    // Today's number of clicks
    const [todaysClicks, setTodaysClicks] = useState<number>(0)

    const { data, loading } = useQuery(GET_ANALYTICS, {
        context: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }, onCompleted: (data) => {
            if (data.globalAnalytics) {
                setDates(data.globalAnalytics)

                // Update state values with the returned dates object
                const clicksArray = data.globalAnalytics.map(d => d.numClicks);
                const totalClicks = clicksArray.reduce((partial_sum, a) => partial_sum + a, 0);
                setClickCount(totalClicks)

                setTodaysClicks(data.globalAnalytics[6].numClicks)
            }
        }, onError: (err) => {
            console.log(err)
        }
    })

    useEffect(() => {

    }, [])

    const getDates = () => {
        return dates.map(d => d.date)
    }
    const getNumClicks = () => {
        return dates.map(d => d.numClicks)
    }
    const getTotalNumClicks = () => {
        let clicksArray = dates.map(d => d.numClicks);
        return clicksArray.reduce((partial_sum, a) => partial_sum + a, 0);
    }

    return (
        <div className="px-10" style={{ height: 'calc(50vh - 4rem)' }}>
            <div className="flex h-72">
                <div className="w-1/6 h-full">
                    <div className="h-3/6 flex items-center justify-center flex-col bg-azure text-white">
                        <IoEarthOutline className="inline-block text-3xl mb-1"></IoEarthOutline>

                        <p className="flex items-center text-xl font-light">Total Clicks</p>
                        <p className="flex font-light text-2xl">{clickCount}</p>
                    </div>
                    <div className=" h-3/6 flex items-center justify-center flex-col bg-oxfordblue text-white">
                        <IoCalendarOutline className="inline-block text-3xl mb-1"></IoCalendarOutline>

                        <p className="flex items-center text-xl font-light">Clicks Today</p>
                        <p className="flex font-light text-2xl">{todaysClicks}</p>
                    </div>
                </div>
                <div className="w-5/6 h-full">
                    <Bar data={{
                        labels: getDates(),
                        datasets: [
                            {
                                label: '# of Clicks',
                                data: getNumClicks(),
                                backgroundColor: [
                                    'rgba(16, 185, 129)'
                                ],
                                borderColor: [
                                    'rgba(16, 185, 129)'
                                ],
                                borderWidth: 1,
                            }
                        ]
                    }} options={{ maintainAspectRatio: false }} className=""></Bar>
                </div>
            </div>
        </div>
    )
}