import React from 'react'
import {connect} from 'react-redux'

class UserCheckout extends React.Component {
  render() {
    const {total, items, orderNum} = this.props.location.state
    return (
      <div id="check-out-view">
        <h1>Purchase Successful!</h1>
        <h2>Total: ${total}</h2>
        <h2>Number of items: {items}</h2>
        <h3>Order #: {orderNum}</h3>
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

export default connect(mapState, mapDispatch)(UserCheckout)
