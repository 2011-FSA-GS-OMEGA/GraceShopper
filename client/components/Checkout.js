import React from 'react'
import {connect} from 'react-redux'

class Checkout extends React.Component {
  render() {
    return <h1>Purchase Successful!</h1>
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(Checkout)
