import React from 'react'
import {connect} from 'react-redux'
import {Navbar} from './components'
import Routes from './routes'
import {createGuestCart} from './store/guestCart'

class App extends React.Component {
  componentDidMount() {
    if (!window.sessionStorage.getItem('guestCart')) {
      this.props.createGuestCart()
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    createGuestCart: () => dispatch(createGuestCart())
  }
}

export default connect(null, mapDispatch)(App)
