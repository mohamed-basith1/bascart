import React, { useEffect, useState } from 'react'
import './Home.css'
import Slider from '../component/Slider'
import Items from '../component/Items'
import Footer from '../component/Footer'
import Product from '../component/Product'
import axios from '../component/axios'
import { useDispatch } from 'react-redux'
import { login } from '../redux/userSlicer'
import { addcount } from '../redux/cartSlicer'
import { CircularProgress } from '@mui/material'
import Loader from '../component/Loader'
const Home = () => {
  const dispatch = useDispatch()
  const [newarrivel, setNewarrivel] = useState([])
  const [loader, setLoader] = useState('')

  useEffect(() => {
    const useremail = window.localStorage.getItem('userenteremail')

    if (useremail) {
      const getuserdetails = async () => {
        const response = await axios.get(`/user/findname/${useremail}`)
      }

      const updatecount = async () => {
        const response = await axios.get(`cart/getcart/${useremail}`)
        setLoader('loader')
        const totalproducts = response.data.reduce((prev, data) => {
          return prev + data.quantity
        }, 0)
        dispatch(addcount(totalproducts))
      }

      getuserdetails()
      updatecount()
    }
    const newarrivels = async () => {
      const response = await axios.get(
        'https://e-commerce-2000.herokuapp.com/product/categories/newarrivels',
      )

      setNewarrivel(response.data)
      setLoader('loader')
    }
    newarrivels()
  }, [])
  const data = [
    { title: 'phone', image: 'phones.jpg' },
    { title: 'watch', image: 'watchs.jpg' },
    { title: 'mensdress', image: 'mens.jpg' },
    { title: 'womensdress', image: 'womens.jpg' },
  ]

  return (
    <div className="home">
      {loader ? (
        <>
          <Slider />
          <div style={{ marginTop: 40 }}>
            <h1
              style={{
                marginLeft: 20,
                backgroundColor: 'rgb(37,44,57)',
                color: 'white',
                borderRadius: 5,
                padding: 5,
              }}
            >
              Catagories
            </h1>
            <div className="categories">
              {data.map((detail) => (
                <Items name={detail} key={detail.image} />
              ))}
            </div>
            <h1
              style={{
                marginLeft: 20,
                marginTop: 20,
                backgroundColor: 'rgb(37,44,57)',
                color: 'white',
                borderRadius: 5,
                padding: 5,
              }}
            >
              New Arrival
            </h1>
          </div>

          <div className="newproduct">
            {newarrivel.map((newproduct) => (
              <Product collection={newproduct} key={newproduct.id} />
            ))}
          </div>
          <Footer />
        </>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default Home
