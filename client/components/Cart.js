import React from 'react'
import {connect} from 'react-redux'

let itemArray = []
// maybe get list of items in array from this.props

class Cart extends React.Component {
  constructor() {
    super()
    this.state = itemArray
  }
  render() {
    return (
      <div>
        <h1>Your Items</h1>
        <form onSubmit>
          <div id="cart-item">
            {/* loop with each item */}
            <label htmlFor="quantity">Quantity:</label>
            <input name="quantity" type="number" />
            <button type="button" onClick>
              Remove
            </button>
          </div>

          <button type="submit">Checkout</button>
        </form>
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
