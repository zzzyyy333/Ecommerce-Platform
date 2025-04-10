import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CartContext from '../context/CartContext'
import CartItem from '../components/CartItem'

export default function Cart() {
  const { cartItems, updateQuantity, removeItem } = useContext(CartContext)

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="cart-page">
      <h2>我的购物车</h2>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>购物车空空如也，快去挑选商品吧！</p>
          <Link to="/products" className="go-shopping">
            去逛逛
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdate={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div className="cart-summary">
            <div className="total-amount">
              总计：¥{totalAmount.toFixed(2)}
            </div>
            <button className="checkout-btn">
              去结算 ({cartItems.length}件)
            </button>
            <Link to="/products" className="continue-shopping">
              继续购物
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}