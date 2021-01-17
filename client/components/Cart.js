import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, editCart, removeFromCart, checkoutCart} from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: []
    }

    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  // Still a little buggy, sometimes changing number manually switches value to string instead of integer
  handleChange(i, e) {
    let quantity = [...this.state.quantity]
    quantity[i] = e.target.value
    this.setState({
      quantity
    })
  }

  handleIncrement(i) {
    this.setState(prevState => {
      let quantity = [...this.state.quantity]
      quantity[i] = prevState.quantity[i] + 1
      return {
        quantity
      }
    })
  }

  handleDecrement(i) {
    if (this.state.quantity[i] > 1) {
      this.setState(prevState => {
        let quantity = [...this.state.quantity]
        quantity[i] = prevState.quantity[i] - 1
        return {
          quantity
        }
      })
    }
  }

  handleEdit(product, quantity) {
    this.props.editCart(product, quantity)
  }

  async handleRemove(product, quantity) {
    await this.props.removeFromCart(product, quantity)
    this.setState({
      quantity: Object.values(this.props.cart.product).map(item => {
        return item[1]
      })
    })
  }

  async handleCheckout() {
    await this.props.checkoutCart()
    alert('congrats on your purchase')
  }

  async componentDidMount() {
    await this.props.fetchCart()
    this.setState({
      quantity: Object.values(this.props.cart.product).map(item => {
        return item[1]
      })
    })
  }

  render() {
    const {cart} = this.props
    const quantity = cart.quantity || 0
    let items = null
    if (quantity !== 0) {
      items = Object.entries(cart.product)
    }
    return (
      <div>
        <h1>Your Items</h1>
        <h2>Total price: ${cart.totalPrice}</h2>
        <h2>Total number of items: {cart.quantity}</h2>
        {quantity !== 0 ? (
          items.map((product, i) => {
            return (
              <div key={product[0]}>
                {console.log(this.state.quantity)}
                <img src={product[1][0].imageUrl} alt="Picture of Product" />
                <h3>{product[1][0].name}</h3>
                <h4>{product[1][0].price}</h4>
                <h4>Amount currently in cart: {product[1][1]}</h4>
                <div className="itemQuantityBox">
                  <input
                    name={`${i}`}
                    type="text"
                    value={this.state.quantity[i]}
                    onChange={this.handleChange.bind(this, i)}
                  />
                  <div className="itemQuantityButtons">
                    <button
                      type="button"
                      onClick={() => this.handleIncrement(i)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => this.handleDecrement(i)}
                    >
                      -
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    this.handleEdit(product[1][0], this.state.quantity[i])
                  }}
                >
                  Update Quantity
                </button>
                <button
                  type="button"
                  onClick={() => {
                    this.handleRemove(product[1][0], this.state.quantity[i])
                  }}
                >
                  Remove from Cart
                </button>
              </div>
            )
          })
        ) : (
          <h1>Empty</h1>
        )}

        <button type="submit" onClick={() => this.handleCheckout()}>
          Checkout
        </button>
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
    fetchCart: () => dispatch(fetchCart()),
    editCart: (product, quantity) => dispatch(editCart(product, quantity)),
    removeFromCart: (product, quantity) =>
      dispatch(removeFromCart(product, quantity)),
    checkoutCart: () => dispatch(checkoutCart())
  }
}

export default connect(mapState, mapDispatch)(Cart)
