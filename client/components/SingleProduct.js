import React, {Component} from 'react'
import {connect} from 'react-redux'
import StarRatings from 'react-star-ratings'

import {fetchProduct} from '../store/singleProduct'
import {postProduct} from '../store/product'
import {addToCart} from '../store/cart'

const defaultState = {
  quantity: 1
}

export class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState

    this.handleChange = this.handleChange.bind(this)
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleIncrement() {
    this.setState(prevState => {
      return {
        quantity: prevState.quantity + 1
      }
    })
  }

  handleDecrement() {
    if (this.state.quantity > 1)
      this.setState(prevState => {
        return {
          quantity: prevState.quantity - 1
        }
      })
  }

  handleClick(product, quantity) {
    this.props.addToCart(product, quantity)
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }

  render() {
    const {product} = this.props
    return (
      <div>
        <div className="singleProductContent">
          <div className="singleProductLeftColumn">
            <img className="productImg" src={product.imageUrl} />
          </div>
          <div className="singleProductCenterColumn">
            <div className="productHeader">
              <h1>{product.name}</h1>
              {/* <StarRatings
                rating={product.rating}
                starRatedColor="gold"
                numberOfStars={5}
                name="rating"
              /> */}
            </div>
            <div className="productSpecs">
              <h2>Price: ${product.price}</h2>
              <p>Model Number: {product.modelNumber}</p>
              <p>Category: {product.type}</p>
              <p>Condition: {product.condition}</p>
            </div>
            <div className="productDesc">
              <h3>Description:</h3>
              <ul>
                {product.description ? (
                  product.description.map((ele, i) => {
                    return <li key={i}>{ele}</li>
                  })
                ) : (
                  <p>Loading data ...</p>
                )}
              </ul>
            </div>
          </div>
          <div className="singleProductRightColumn">
            <div>
              <h2>${product.price}</h2>
            </div>
            <div>
              <div className="quantityBox">
                <input
                  name="quantity"
                  type="text"
                  value={this.state.quantity}
                  onChange={this.handleChange}
                />
                <div className="quantityButtons">
                  <button type="button" onClick={() => this.handleIncrement()}>
                    +
                  </button>
                  <button type="button" onClick={() => this.handleDecrement()}>
                    -
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  this.handleClick(product, this.state.quantity)
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        {/* <div className="reviewsContainer">
          <div className="productReviews">
            <div>
              <div>
                <h1>Customer Reviews for {this.props.name}</h1>
              </div>
              <select className="reviewsSelect">
                <option value="All reviews">All reviews</option>
                <option value="Last 6 months">Last 6 months</option>
                <option value="Last 3 months">Last 3 months</option>
                <option value="Last month">Last month</option>
              </select>
            </div>
            <div>
              Reviews ----> render up to 5 reviews, if >5, render button to go
              to all reviews page
            </div>
          </div>
        </div> */}
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.singleProductReducer
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: productId => dispatch(fetchProduct(productId)),
    addToCart: (product, quantity) => dispatch(addToCart(product, quantity))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
