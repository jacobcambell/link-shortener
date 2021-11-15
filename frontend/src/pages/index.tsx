import React, { useState } from "react"
import '../styles/index.scss'
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
      <div className="jumbo">
        <img src={`logo.png`} alt="Logo" className='logo' />

        <p className="title">Easily Create Short Links</p>

        <div className="row">
          <input onChange={(e) => { setLink(e.target.value) }} type="text" className="link" placeholder="Paste your link" />
          <button className="btn" onClick={onShortenClick}>{loading ? <FaSpinner className="spinner" /> : 'Shorten'}</button>
        </div>

        {
          shortlink &&
          <div className="readyBox">
            <p className="header">{clipboardStatus}</p>
            <p className="link">{`xxd.pw/${shortlink}`} <FaCopy onClick={onCopyClick} /></p>
          </div>
        }
        {
          data?.createShortLink.__typename === 'Error' &&
          <p className="error">{data.createShortLink.errorMessage}</p>
        }

        <div className="box">
          <p className="title">Create a FREE Account For More Features!</p>

          <div className="featureRow">
            <div className="feature">
              <p className="feature-title"><IoAnalyticsOutline /> Analytics</p>
              <p className="feature-desc">Track everything from number of clicks, time clicked, user agent, and more.</p>
            </div>
            <div className="feature">
              <p className="feature-title"><IoLaptopOutline /> Management</p>
              <p className="feature-desc">Manage all your links in one easy to use dashboard. Add, modify and delete links with ease.</p>
            </div>
            <div className="feature">
              <p className="feature-title"><IoLinkOutline /> Redirects</p>
              <p className="feature-desc">Reroute your users to a new location right from the dashboard.</p>
            </div>
          </div>

          <Link to='/signup' className="signup">Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default IndexPage