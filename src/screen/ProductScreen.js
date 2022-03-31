import React, { useEffect, useState } from 'react'
import Footer from '../component/Footer'
import './ProductScreen.css'
import { useParams } from 'react-router-dom'
import axios from '../component/axios'
import { useDispatch } from 'react-redux'
import { addcart, inccount } from '../redux/cartSlicer'
import Loader from '../component/Loader'

const ProductScreen = () => {
  const [state, setState] = useState([])
  const [counter, Setcounter] = useState(1)
  const [change, setChange] = useState(true)
  const [loader, setLoader] = useState('')
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    const getproduct = async () => {
      const response = await axios.get(
        `https://e-commerce-2000.herokuapp.com/product/product/${id}`,
      )

      setLoader('loader')
      setState(response.data)
    }
    getproduct()
  }, [id])
  const cartclicked = () => {
    const token = window.localStorage.getItem('userentertoken')
    const useremail = window.localStorage.getItem('userenteremail')

    const data = {
      email: useremail,
      products: state.products,
      price: state.price,
      id: id,
      image: state.image,
      categories: state.categories,
      quantity: counter,
      totalprice: state.price,
    }

    const cartadd = async () => {
      setChange(!change)
      if (useremail) {
        const response = await axios
          .post('/cart/', data)
          .then(console.log('upload sucessfully'))
        dispatch(inccount())
      } else {
        console.log('ippa reduce use panni add pannikanum')

        const data = {
          email: useremail,
          products: state.products,
          price: state.price,
          id: id,
          image: state.image,
          categories: state.categories,
          quantity: counter,
          totalprice: state.price,
        }
        dispatch(addcart(data))
        dispatch(inccount())
      }
    }
    cartadd()
  }
  const counteradd = () => {
    Setcounter(counter + 1)
  }
  const counterreduce = () => {
    Setcounter(counter - 1)
  }

  return (
    <div className="productscreen">
      {loader ? (
        <>
          <div className="productcontent">
            <div className="image">
              <img src={`${state.image}`} alt="" />
            </div>

            <div className="content">
              <div>
                <div>
                  <p className="title">title</p>
                  <p>{state.products}</p>
                </div>
                <div>
                  <p className="title">price</p>
                  <p>
                    ₹ <span style={{ color: 'red' }}>{state.price} </span>
                  </p>
                </div>
                <div>
                  <p className="title">Stack</p>
                  <p
                    className={
                      state.stack === 'instack' ? 'stackgreen' : 'stackred'
                    }
                  >
                    {state.stack}
                  </p>
                </div>
                <div>
                  <p className="title">Quantity</p>
                  <div style={{ display: 'flex' }}>
                    <button
                      className="addbutton"
                      disabled={counter == 1}
                      onClick={counterreduce}
                    >
                      -
                    </button>
                    <p style={{ fontWeight: 800 }}>{counter}</p>
                    <div className="addbutton" onClick={counteradd}>
                      +
                    </div>
                  </div>
                </div>
                <div>
                  <p className="title">description</p>
                  <p>{state.description}</p>
                </div>
              </div>
              <div>
                <button
                  disabled={state.stack === 'outofstack'}
                  className="cartbtn"
                  onClick={cartclicked}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          <Footer />
        </>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default ProductScreen
