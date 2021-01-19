import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="navbar-header">
    <div className="navbar-title">
      <img
        className="jellybean"
        src="https://rlv.zcache.com/cutie_cartoon_red_jelly_bean_vinyl_sticker-r3c275299c36c4187b0f782ac3465db98_08m3m_704.jpg?rlvnet=1"
      />
      <h1>Jellybeans and Shoes</h1>
    </div>
    <nav className="navbar">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/products">Products</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">Guest Cart</Link>
          {/* <Link to="/cart">Cart</Link> */}
          <Link to="/products">Products</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
