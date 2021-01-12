import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = () => {
  return (
    <div className="card">
      <Link to={`/products/${product.id}`}>
        <div className="card-body">
          <img className="card-image" src={product.imageUrl} />
          <div className="card-stats">
            <h2>{product.name}</h2>
            <ul>
              <li>Price: {product.price}</li>
              <li>Type: {product.type}</li>
              <li>Status: {product.status}</li>
            </ul>
          </div>
        </div>
      </Link>
      <div className="card-controls">
        <button className="card-button" type="button">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
