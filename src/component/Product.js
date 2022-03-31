import React from 'react'
import './Product.css'
import { useNavigate } from 'react-router'

const Product = ({ collection }) => {
  const navigation = useNavigate()

  const productclick = () => {
    navigation(`/product/${collection.id}`)
  }
  return (
    <div className="product" onClick={productclick} style={{ marginRight: 10 }}>
      <div className="images">
        <img src={`${collection.image}`} alt="" />
      </div>
      <p>{collection.products}</p>
    </div>
  )
}

export default Product
