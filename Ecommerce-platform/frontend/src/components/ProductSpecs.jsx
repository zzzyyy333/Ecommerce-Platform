import React from 'react'

export default function ProductSpecs({ specs, selected, onChange, stock }) {
  const handleSelect = (specType, value) => {
    onChange(specType, value)
  }

  return (
    <div className="product-specs">
      {Object.entries(specs).map(([specType, values]) => (
        <div key={specType} className="spec-group">
          <h4>{specType}</h4>
          <div className="spec-options">
            {values.map(value => (
              <button
                key={value}
                className={`spec-option ${selected[specType] === value ? 'selected' : ''}`}
                onClick={() => handleSelect(specType, value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="stock-info">库存：{stock}件</div>
    </div>
  )
}