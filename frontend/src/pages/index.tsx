import * as React from "react"
import '../styles/index.scss'
import { Link } from 'gatsby'

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
      </div>
    </div>
  )
}

export default IndexPage