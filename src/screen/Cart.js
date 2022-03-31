import React, { useState, useEffect } from 'react'
import Empty from '../component/Empty'
import Productcollection from '../component/Productcollection'
import './Cart.css'
import axios from '../component/axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addcount } from '../redux/cartSlicer'
import { useDispatch } from 'react-redux'
import Loader from '../component/Loader'
import StripeCheckout from 'react-stripe-checkout'

const Cart = () => {
  const [total, setTotal] = useState('')
  const [data, setData] = useState([])
  const [usertoken, setUsertoken] = useState(null)

  const [totalproduct, setTotalproduct] = useState([])
  const [address, setAddress] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const Redux = useSelector((state) => state.cart.product)
  const Reduxprice = useSelector((state) => state.cart.total)
  const [loader, setLoader] = useState('')
  const useremail = window.localStorage.getItem('userenteremail')
  useEffect(() => {
    const Subtotal = () => {
      const Getcartproducts = async () => {
        const useremail = await window.localStorage.getItem('userenteremail')

        //this operwtion can only working in when have useremail
        if (useremail) {
          const response = await axios.get(`cart/getcart/${useremail}`)

          const products = response.data
          setData(products)
          const sum = products.reduce(function (prev, data) {
            return prev + +data.totalprice
          }, 0)
          const totalproducts = products.reduce((prev, data) => {
            return prev + data.quantity
          }, 0)
          setTotalproduct(totalproducts)

          setTotal(sum)

          const totalproductscount = response.data.reduce((prev, data) => {
            return prev + data.quantity
          }, 0)
          dispatch(addcount(totalproductscount))

          const address = await axios.get(`user/findname/${useremail}`)
          setLoader('loader')

          setAddress(address.data)
        } else {
          console.log('this is for redux')
          setData(Redux)

          const totalqty = Redux.reduce((prev, data) => {
            return prev + data.quantity
          }, 0)
          setTotalproduct(totalqty)
          const totalprice = Reduxprice.reduce((prev, data) => {
            return prev + data
          }, 0)
          setLoader('loader')
          setTotal(totalprice)
        }
      }
      Getcartproducts()
    }
    Subtotal()
  }, [])

  //strip payment
  // useEffect(() => {
  //   const payment = async () => {
  //     const response = await axios.post('http://localhost:8000/checkout/', {
  //       email: useremail,
  //       tokenid: usertoken.id,
  //     })

  //     console.log(response.data)
  //   }
  //   usertoken && payment()
  //   console.log('checout ')
  // }, [usertoken])

  const Checkout = (token) => {
    const user = window.localStorage.getItem('userenteremail')
    if (user) {
      setUsertoken(token)
      console.log(token)
    } else {
      navigate('/register')
    }
  }
  const key =
    'pk_test_51K0qgYSIS3i4kopWZ1riUiIzGZArHBc7AhQVSGBcUhEDi5NhLKQT0lR3pvcgrcQPMeVNksgRT7qajFxirp3M6u4X00Cs9ZAFGG'

  return (
    <>
      {loader ? (
        <div style={{ marginTop: 90 }}>
          <div className="header"> Your Bag </div>
          <div className="cart">
            <div className="leftside">
              {data.length >= 1 ? (
                data.map((items) => (
                  <Productcollection item={items} key={items.id} />
                ))
              ) : (
                <Empty />
              )}
            </div>
            <div className="rightside">
              <div className="price">
                <h3>{`Subtotal ( ${totalproduct} items ) : ₹ ${total}`}</h3>
                {/* <StripeCheckout
                  image="iphone.jpg"
                  name="basithcart"
                  description="your total 200"
                  stripeKey={key}
                  token={Checkout}
                  amount={100}
                > */}
                <button
                  className="editbutton"
                  disabled={data.length === 0}
                  onClick={Checkout}
                >
                  Check out
                </button>
                {/* </StripeCheckout> */}
              </div>
              <div className="location">
                <h3>Address</h3>
                <div className="address">
                  {address.address} <br />
                  {address.pincode}
                </div>
                <button
                  className="editbutton"
                  disabled={address.length === 0}
                  onClick={() => navigate('/editscreen')}
                >
                  Edit Address
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Cart
