import React from 'react'
import {connect} from 'react-redux'

let itemArray = []

class Cart extends React.Component {
  constructor() {
    super()
    this.state = itemArray
  }
  render() {
    return (
      <div>
        <h1>Your Cart</h1>
        <ul>
          <li />
          <li />
          <li />
        </ul>
        <button type="submit">Checkout</button>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(Cart)
