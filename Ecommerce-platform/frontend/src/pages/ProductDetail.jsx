import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import ProductSpecs from '../components/ProductSpecs'
import ProductReviews from '../components/ProductReviews'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [selectedSpecs, setSelectedSpecs] = useState({})

  // 模拟商品数据
  useEffect(() => {
    const mockProduct = {
      id: 1,
      name: '示例商品',
      images: ['/placeholder1.jpg', '/placeholder2.jpg'],
      specs: {
        color: ['红色', '蓝色'],
        size: ['S', 'M']
      },
      stock: 100,
      price: 299.00,
      reviews: []
    }
    setProduct(mockProduct)
  }, [])

  const handleSpecChange = (specType, value) => {
    setSelectedSpecs(prev => ({
      ...prev,
      [specType]: value
    }))
  }

  if (!product) return <div>加载中...</div>

  return (
    <div className="product-detail-container">
      <section className="image-gallery">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          {product.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`商品图${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <ProductSpecs
        specs={product.specs}
        selected={selectedSpecs}
        onChange={handleSpecChange}
        stock={product.stock}
      />

      <div className="price-section">
        <h2>¥{product.price.toFixed(2)}</h2>
        <button className="add-to-cart">加入购物车</button>
      </div>

      <ProductReviews reviews={product.reviews} />
    </div>
  )
}