import React, { useEffect, useState } from 'react'
import { IoEarthOutline, IoCalendarOutline } from 'react-icons/io5'
import { Bar } from 'react-chartjs-2'

export default function Analytics() {

    // An array of strings containing date values for the past 7 days, i.e '11/14', '11/15', '11/16' etc
    const [dates, setDates] = useState<string[]>([''])

    // Array of numbers containing the number of clicks for the past 7 days, i.e 2, 5, 6, etc
    const [numClicks, setNumClicks] = useState<number[]>([])

    useEffect(() => {
    }, [])

    return (
        <div className="px-10">
            <div className="flex h-72">
                <div className="w-1/6 h-full">
                    <div className="h-3/6 flex items-center justify-center flex-col bg-azure text-white">
                        <IoEarthOutline className="inline-block text-3xl mb-1"></IoEarthOutline>

                        <p className="flex items-center text-xl font-light">Total Clicks</p>
                        <p className="flex font-light text-2xl">23</p>
                    </div>
                    <div className=" h-3/6 flex items-center justify-center flex-col bg-oxfordblue text-white">
                        <IoCalendarOutline className="inline-block text-3xl mb-1"></IoCalendarOutline>

                        <p className="flex items-center text-xl font-light">Clicks Today</p>
                        <p className="flex font-light text-2xl">6</p>
                    </div>
                </div>
                <div className="w-5/6 h-full">
                    <Bar data={{
                        labels: dates,
                        datasets: [
                            {
                                label: '# of Clicks',
                                data: numClicks,
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
