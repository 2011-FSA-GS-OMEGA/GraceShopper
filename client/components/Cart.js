import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'

let itemArray = []
// maybe get list of items in array from this.props

class Cart extends React.Component {
  constructor() {
    super()
    this.state = itemArray
  }
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    const {cart} = this.props
    // Doesn't work properly
    const products = cart.product || {}
    console.log(products)
    return (
      <div>
        <h1>Your Items</h1>
        {/* Doesn't work properly */}
        <h1>{cart.quantity}</h1>
        {products ? <h1>{products.Hello}</h1> : <h1>Empty</h1>}
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
  return {
    cart: state.cartReducer
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapState, mapDispatch)(Cart)
