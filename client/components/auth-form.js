import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {checkOutGuestCart, createGuestCart} from '../store/guestCart'

/**
 * COMPONENT
 */
class AuthForm extends React.Component {
  handleLogin(e) {
    this.props.handleSubmit(e)
    this.props.checkOutGuestCart()
    this.props.createGuestCart()
  }

  handleCreateAccount(e) {
    this.props.handleCreateSubmit(e)
    this.props.checkOutGuestCart()
    this.props.createGuestCart()
  }
  render() {
    const {name, displayName, error} = this.props

    return (
      <div>
        <div>{name === 'signup' ? <h1>Sign up</h1> : <h1>Login</h1>}</div>
        <form
          onSubmit={
            name === 'signup'
              ? e => this.handleCreateAccount(e)
              : e => this.handleLogin(e)
          }
          name={name}
        >
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="email" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            {name === 'signup' ? (
              <div>
                <label htmlFor="confirmPassword">
                  <small>Confirm Password</small>
                </label>
                <input name="confirmPassword" type="password" />
              </div>
            ) : null}
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">{displayName} with Google</a>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const cart = JSON.parse(window.sessionStorage.getItem('guestCart'))
      console.log('Front end cart ----->', cart)
      dispatch(auth(email, password, formName, cart))
    },
    handleCreateSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const cart = JSON.parse(window.sessionStorage.getItem('guestCart'))
      if (evt.target.confirmPassword.value === password) {
        dispatch(auth(email, password, formName, cart))
      } else {
        alert('Passwords do not match')
      }
    },
    createGuestCart: () => dispatch(createGuestCart()),
    checkOutGuestCart: () => dispatch(checkOutGuestCart())
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
