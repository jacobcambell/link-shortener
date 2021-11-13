import * as React from "react"
import '../styles/index.scss'
import { Link } from 'gatsby'
import { IoAnalyticsOutline, IoLinkOutline, IoLaptopOutline } from 'react-icons/io5'

const IndexPage = () => {
  return (
    <div>
      <div className='navbar'>
        <Link to='/' className='logo'>xxd.pw</Link>
      </div>

      <div className="jumbo">
        <p className="title">Easily Create Short Links</p>
        {/* <p className="desc">Sign up for a free account to name, save, and view analytics on all your links.</p>
        <a href="" className="signup">Sign Up Free</a> */}

        <div className="row">
          <input type="text" className="link" placeholder="Paste your link" />
          <button className="btn">Shorten</button>
        </div>

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

          <Link to='/register' className="signup">Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default IndexPage