import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 15})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }

  loginFormSubmitted = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  usernameInputChanged = event => {
    this.setState({username: event.target.value})
  }

  passwordInputChanged = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <div className="login-sub-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="websiteLogo"
          />
          <form onSubmit={this.loginFormSubmitted} className="form-container">
            <label htmlFor="username">USERNAME</label>
            <input
              value={username}
              id="username"
              onChange={this.usernameInputChanged}
              className="login-input-element for-top-margin"
              type="text"
              placeholder="Username"
            />
            <label className="for-top-margin" htmlFor="password">
              PASSWORD
            </label>
            <input
              value={password}
              id="password"
              onChange={this.passwordInputChanged}
              className="login-input-element for-top-margin"
              type="password"
              placeholder="Password"
            />
            <button type="submit" className="login-button for-top-margin">
              Login
            </button>
            {showSubmitError && <p className="errorMessage">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
