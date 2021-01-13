import React from 'react'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'
import {fetchProducts} from '../store/product'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    const {products} = this.props
    return (
      <div className="component-content">
        <div className="component-header">
          <h1>All Products</h1>
        </div>

        <div className="component-body-products-list">
          {products && products.length
            ? products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            : 'There are no products available at the moment. Check back again soon.'}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(AllProducts)
