import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="main-header">
      <div className="header-content">
        <Link to="/" className="logo">
          电子商城
        </Link>
        
        <nav className="main-nav">
          <Link to="/products">商品分类</Link>
          <Link to="/">限时秒杀</Link>
          <Link to="/">我的收藏</Link>
        </nav>

        <div className="header-right">
          <div className="search-box">
            <input type="text" placeholder="搜索商品" />
            <button type="button">搜索</button>
          </div>
          
          <div className="user-actions">
            <Link to="/login" className="login-btn">登录/注册</Link>
            <Link to="/cart" className="cart-btn">
              购物车
              <span className="cart-count">0</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}