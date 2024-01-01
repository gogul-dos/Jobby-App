import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props
  const logoClicked = () => {
    history.push('/')
  }
  const logoutClicked = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <Link to="/">
        <img
          onClick={logoClicked}
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="websiteLogo for-logo-image"
        />
      </Link>
      <ul className="header-unordered-list">
        <Link to="/" className="for-link">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="for-link">
          <li>Jobs</li>
        </Link>
      </ul>
      <ul>
        <li>
          <button
            type="button"
            className="logoutButton"
            onClick={logoutClicked}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}
export default withRouter(Header)
