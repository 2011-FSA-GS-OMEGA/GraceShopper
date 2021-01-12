import React from 'react'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'

// product component card rendered in all products component
export class AllProducts extends React.Component {
  render() {
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
