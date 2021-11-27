import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { FaLink, FaChartBar } from 'react-icons/fa'

const ALL_LINKS_QUERY = gql`
    query allLinks {
        allLinks {
            id,
            shortlink,
            created,
            destination
            name
        }
    }
`

type LinkType = {
    id: number,
    shortlink: string,
    created: string,
    destination: string
    name: string
}

export default function LinkList() {

    const [links, setLinks] = useState<LinkType[]>([
        {
            id: 0,
            shortlink: '',
            created: '',
            destination: '',
            name: ''
        }
    ])
    const [selected, setSelected] = useState<number>(0)

    const { data } = useQuery(ALL_LINKS_QUERY, {
        onCompleted: (data) => {
            setLinks(data.allLinks)
        },
        onError: (err) => {
            console.log(err)
        },
        context: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }
    })

    return (
        <div className="flex flex-1 border border-t border-cadetgrey" style={{ height: 'calc(50vh)' }}>
            <div className="w-1/3 overflow-y-scroll">
                {
                    links &&
                    links.map((link, index) => (
                        <div
                            className="border-b border-cadetgrey p-3 bg-gray-100 cursor-pointer" key={link.id}
                            onClick={() => { setSelected(index) }}
                        >
                            <p className="text-cadetgrey text-sm">{timestampToDate(link.created)}</p>
                            <p className="text-lg">{link.name ? link.name : link.destination}</p>
                            <a href={`https://xxd.pw/${link.shortlink}`} target="_blank" className="text-azure inline-flex items-center">xxd.pw/{link.shortlink} <FaLink className="ml-1" /></a>
                        </div>
                    ))
                }
            </div>
            <div className="w-2/3 p-5">
                <p className="text-cadetgrey">Created: {timestampToDate(links[selected].created)}</p>
                <p className="text-2xl">{links[selected].name ? links[selected].name : links[selected].destination}</p>
                <a href={links[selected].destination} target="_blank" className="text-cadetgrey">{links[selected].destination}</a>

                <p className="text-azure text-2xl mt-5"><FaChartBar className="inline mr-1 text-2xl" /> 0 total clicks</p>
            </div>
        </div>
    )
}

const timestampToDate = (s: string) => {
    return new Date(Number(s)).toISOString().substr(0, 10)
}