import React from 'react'
import {connect} from 'react-redux'

class Checkout extends React.Component {
  render() {
    const {total, items} = this.props.location.state
    return (
      <div id="check-out-view">
        <h1>Purchase Successful!</h1>
        <h2>Total: ${total}</h2>
        <h2>{items} Items</h2>
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

export default connect(mapState, mapDispatch)(Checkout)
