import React from 'react'
import './ProductCollection.css'
import axios from './axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeitem } from '../redux/cartSlicer'

const Productcollection = ({ item }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const remove = () => {
    const useremail = window.localStorage.getItem('userenteremail')
    const Removeitem = async () => {
      const response = await axios.delete(`/cart/${item.id}`)
      if (response.data === 'product remove') {
        window.location.reload()
      }
    }
    Removeitem()
  }

  const show = () => {
    navigate(`/product/${item.id}`)
  }

  return (
    <div className="producttemplate">
      <div
        className="productimage"
        style={{ objectFit: 'cover', marginRight: 10 }}
      >
        <img src={`${item.image}`} alt="problem" />
      </div>
      <div className="productdetails">
        <h3>{item.products}</h3>
        <p> {`₹ ${item.price}`}</p>

        <p>QTY : {item.quantity}</p>

        <div className="buttons">
          <div className="dlebtn" onClick={remove}>
            Remove
          </div>
          <div className="buybtn" onClick={show}>
            Show
          </div>
        </div>
      </div>
    </div>
  )
}

export default Productcollection
