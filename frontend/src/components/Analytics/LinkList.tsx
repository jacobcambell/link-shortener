import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { FaLink, FaChartBar } from 'react-icons/fa'

const ALL_LINKS_QUERY = gql`
    query allLinks {
        allLinks {
            id,
            shortlink,
            created,
            destination
            name,
            analytics {
                totalClicks
            }
        }
    }
`

const DELETE_LINK_QUERY = gql`
    mutation delete ($id: Int!) {
        deleteLink(id: $id)
    }
`

type LinkType = {
    id: number,
    shortlink: string,
    created: string,
    destination: string
    name: string,
    analytics: { totalClicks: number }
}

export default function LinkList() {

    const [links, setLinks] = useState<LinkType[]>([])
    const [selected, setSelected] = useState<number>(0)

    const { data, refetch, loading } = useQuery(ALL_LINKS_QUERY, {
        onCompleted: (data) => {
            setLinks(data.allLinks)
            console.log(data.allLinks)
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

    const [handleDelete] = useMutation(DELETE_LINK_QUERY, {
        onError: (err) => {
            console.log(err)
        },
        onCompleted: () => {
            refetch()
        },
        context: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }
    })

    const deleteLink = (id: number) => {
        handleDelete({
            variables: {
                id: Number(id)
            }
        })
    }

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
                {
                    links && links.length > 0 &&
                    <div>
                        <p className="text-cadetgrey">Created: {timestampToDate(links[selected].created)}</p>
                        <p className="text-2xl">{links[selected].name ? links[selected].name : links[selected].destination}</p>
                        <a href={links[selected].destination} target="_blank" className="text-cadetgrey">{links[selected].destination}</a>

                        <p className="text-azure text-2xl mt-5"><FaChartBar className="inline mr-1 text-2xl" /> {links[selected].analytics.totalClicks} total clicks</p>

                        {/* Buttons */}
                        <div className="my-3">
                            <button className="bg-red-700 text-white p-2" onClick={() => { deleteLink(links[selected].id) }}>Delete</button>
                        </div>
                    </div>

                }
            </div>
        </div>
    )
}

const timestampToDate = (s: string) => {
    return new Date(Number(s)).toISOString().substr(0, 10)
}