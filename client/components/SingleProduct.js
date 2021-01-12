import React, {Component} from 'react'

export class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  incrementQuant() {
    let quant = document.querySelector('input').innerText
    quant = quant + 1
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div className="singleProductContent">
          <div className="singleProductLeftColumn">
            <img className="productImg" src={this.props.imageUrl} />
          </div>
          <div className="singleProductCenterColumn">
            <div className="productHeader">
              <h1>{this.props.name}</h1>
              <p>{this.props.vendor.name}</p>
              <p>{this.props.rating}</p>
            </div>
            <div className="productSpecs">
              <h2>${this.props.price}</h2>
              <p>{this.props.modelNumber}</p>
              <p>{this.props.type}</p>
              <p>{this.props.condition}</p>
            </div>
            <div className="productDesc">
              <p>{this.props.description}</p>
            </div>
          </div>
          <div className="singleProductRightColumn">
            <div>
              <h2>${this.props.price}</h2>
            </div>
            <div>
              <div>
                <input
                  type="number"
                  value={this.state.quantity}
                  name="quantityBox"
                />
                <div className="quantityButtons">
                  <button type="button" onClick={() => incrementQuant()}>
                    +
                  </button>
                  <button type="button" onClick={() => decrementQuanty()}>
                    -
                  </button>
                </div>
              </div>
              {/* <button type="button" onClick={() => }>Add to Cart</button> */}
            </div>
          </div>
        </div>
        <div>
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
        </div>
      </div>
    )
  }
}

const mapState = dispatch => {
  return {}
}

const mapDispatch = state => {
  return {
    addToCart: product => dispatch(addToCart(product))
  }
}
