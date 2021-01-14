import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = ({product}) => {
  return (
    <div className="card">
      <div className="card-body">
        <img className="card-image" src={product.imageUrl} />
        <div className="card-stats">
          <Link to={`/products/${product.id}`}>
            <h2>{product.name}</h2>
          </Link>
          <ul>
            <li>Price: ${product.price}</li>
            <li>Type: {product.type}</li>
            <li>Status: {product.status}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
