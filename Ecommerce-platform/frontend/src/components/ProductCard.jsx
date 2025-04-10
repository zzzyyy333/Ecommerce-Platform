import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="product-image">
          <img src={product.thumbnail} alt={product.name} />
        </div>
        
        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>
          
          <div className="price-section">
            <span className="current-price">¥{product.price}</span>
            {product.originalPrice && (
              <span className="original-price">¥{product.originalPrice}</span>
            )}
          </div>

          <div className="rating-section">
            <span className="rating-stars">
              {'★'.repeat(product.rating).padEnd(5, '☆')}
            </span>
            <span className="rating-count">({product.reviewCount})</span>
          </div>
        </div>
      </Link>

      <button className="quick-add-cart">
        加入购物车
      </button>
    </div>
  )
}