import * as React from "react"
import '../styles/index.scss'
import { Link } from 'gatsby'
import { IoAnalyticsOutline, IoLinkOutline, IoLaptopOutline } from 'react-icons/io5'
import { FaSpinner } from 'react-icons/fa'
import { gql, useMutation } from '@apollo/client'
import Navbar from "../components/Navbar/Navbar"

const CREATE_SHORTLINK = gql`
    mutation create($destination: String!) {
      createShortLink(destination: $destination) {
        ... on Error {
          errorMessage
        }

        ... on Link {
          destination
          shortlink
        }
      }
    }
  `

const IndexPage = () => {
  const [link, setLink] = React.useState<string>('')

  const [createShortLink, { data, loading }] = useMutation(CREATE_SHORTLINK)

  const onShortenClick = () => {
    createShortLink({
      variables: {
        destination: link
      }
    })
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
          data?.createShortLink.__typename === 'Error' &&
          <p className="error">{data.createShortLink.errorMessage}</p>
        }

        {
          data?.createShortLink.__typename === 'Link' &&
          <p className="success">{data.createShortLink.shortlink}</p>
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