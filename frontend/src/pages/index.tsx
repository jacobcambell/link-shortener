import React, { useState } from "react"
import { Link } from 'gatsby'
import { IoAnalyticsOutline, IoLinkOutline, IoLaptopOutline } from 'react-icons/io5'
import { FaSpinner, FaCopy } from 'react-icons/fa'
import { gql, useMutation } from '@apollo/client'
import Navbar from "../components/Navbar/Navbar"

const CREATE_SHORTLINK = gql`
    mutation create($destination: String!) {
      createShortLink(destination: $destination) {
        ... on Error {
          errorMessage
        }

        ... on Link {
          shortlink
        }
      }
    }
  `

const IndexPage = () => {
  // The link entered into the input by the user
  const [link, setLink] = useState<string>('')

  // The shortlink that will be returned after the api call
  const [shortlink, setShortlink] = useState<string | undefined>()

  // A short message telling the user when they have copied to the clipboard
  const [clipboardStatus, setClipboardStatus] = useState('Your shortlink is ready!')

  const [createShortLink, { data, loading }] = useMutation(CREATE_SHORTLINK, {
    onCompleted: (data) => {
      if (data.createShortLink.shortlink) {
        setShortlink(data.createShortLink.shortlink)
      }
    }
  })

  const onShortenClick = () => {
    setClipboardStatus('Your shortlink is ready!')
    setShortlink(undefined)

    createShortLink({
      variables: {
        destination: link
      }
    })
  }

  const onCopyClick = () => {
    setClipboardStatus('Copied to clipboard!')
    navigator.clipboard.writeText('https://xxd.pw/' + shortlink)
  }


  return (
    <div>
      <Navbar />
      <div className="flex items-center flex-col justify-center pb-8 text-oxfordblue w-11/12 lg:w-3/4 2xl:w-1/2 m-auto">
        <img src={`logo.png`} alt="Logo" className='w-20 my-4' />

        <p className="text-2xl">Easily Create Short Links</p>

        <div className="flex flex-col my-3 w-full">
          <input className="border border-cadetgrey p-3 text-oxfordblue mb-3" onChange={(e) => { setLink(e.target.value) }} type="text" placeholder="Paste your link" />
          <button className="bg-azure p-3 text-white" onClick={onShortenClick}>{loading ? <FaSpinner className="spinner m-auto" /> : 'Shorten'}</button>
        </div>

        {
          shortlink &&
          <div className="w-full text-center my-3 bg-green-700 text-white py-2">
            <p className="header">{clipboardStatus}</p>
            <p className="flex items-center justify-center text-2xl">{`xxd.pw/${shortlink}`} <FaCopy className="inline ml-1 cursor-pointer" onClick={onCopyClick} /></p>
          </div>
        }
        {
          data?.createShortLink.__typename === 'Error' &&
          <p className="text-red-500">{data.createShortLink.errorMessage}</p>
        }

        <div className="flex flex-col w-full my-10 text-oxfordblue text-center ">
          <p className="text-2xl mb-5">Create a FREE Account For More Features!</p>

          <div className="flex flex-col sm:flex-row">
            <div className="px-16 py-2 sm:px-2 sm:py-0 flex-1">
              <IoAnalyticsOutline className="text-2xl m-auto" />
              <p className="flex items-center justify-center text-xl"> Analytics</p>
              <p>Track everything from number of clicks, time clicked, user agent, and more.</p>
            </div>
            <div className="px-16 py-2 sm:px-2 sm:py-0 flex-1">
              <IoLaptopOutline className="inline text-2xl m-auto" />
              <p className="flex items-center justify-center text-xl">Management</p>
              <p className="feature-desc">Manage all your links in one easy to use dashboard. Add, modify and delete links with ease.</p>
            </div>
            <div className="px-16 py-2 sm:px-2 sm:py-0 flex-1">
              <IoLinkOutline className="inline text-2xl m-auto" />
              <p className="flex items-center justify-center text-xl">Redirects</p>
              <p className="feature-desc">Reroute your users to a new location right from the dashboard.</p>
            </div>
          </div>
        </div>

        <Link to="/signup" className="bg-azure text-white py-1 px-3">Sign Up</Link>
      </div>
    </div>
  )
}

export default IndexPage