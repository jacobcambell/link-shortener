import React, { useEffect } from 'react'
import { IoEarthOutline, IoCalendarOutline } from 'react-icons/io5'
import { Bar } from 'react-chartjs-2'

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const options = {
    maintainAspectRatio: false
};

export default function Analytics() {

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
                    <Bar data={data} options={options} className=""></Bar>
                </div>
            </div>
        </div>
    )
}
