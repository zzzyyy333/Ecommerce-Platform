import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import FilterSidebar from '../components/FilterSidebar'

export default function ProductList() {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  
  // TODO: 实现筛选逻辑
  const handleFilter = (filters) => {
    console.log('应用筛选条件:', filters)
  }

  return (
    <div className="product-list-page">
      <FilterSidebar 
        onFilter={handleFilter}
        category={searchParams.get('category')}
      />
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}