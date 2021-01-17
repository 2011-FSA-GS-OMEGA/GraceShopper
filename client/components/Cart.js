import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
import {editCart} from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: []
    }

    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
    this.handleClick = this.handleClick.bind(this)
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

  handleClick() {}

  async componentDidMount() {
    await this.props.fetchCart()
    this.setState({
      quantity: Object.values(this.props.cart.product).map(product => {
        return product[1]
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
        {quantity !== 0 ? (
          items.map((product, i) => {
            return (
              <div key={product[0]}>
                {console.log(this.state.quantity)}
                <img src={product[1][0].imageUrl} alt="Picture of Product" />
                <h3>{product[1][0].name}</h3>
                <h4>{product[1][0].price}</h4>
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
                    this.handleClick()
                  }}
                >
                  Update Quantity
                </button>
              </div>
            )
          })
        ) : (
          <h1>Empty</h1>
        )}

        {/* <form onSubmit>
          <div id="cart-item">
            <label htmlFor="quantity">Quantity:</label>
            <input name="quantity" type="number" />
            <button type="button" onClick>
              Remove
            </button>
          </div> */}

        <button type="submit">Checkout</button>
        {/* </form> */}
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
