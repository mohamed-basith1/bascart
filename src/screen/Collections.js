import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../component/Footer'
import Product from '../component/Product'
import './Collection.css'
import axios from '../component/axios'
import { useDispatch } from 'react-redux'
import { addcount } from '../redux/cartSlicer'
import Loader from '../component/Loader'

const Collections = () => {
  const { id } = useParams()
  const [datas, setData] = useState([])
  const dispatch = useDispatch()
  const [loader, setLoader] = useState('')

  useEffect(() => {
    const useremail = window.localStorage.getItem('userenteremail')
    if (useremail) {
      const updatecount = async () => {
        const response = await axios.get(`cart/getcart/${useremail}`)
        const totalproducts = response.data.reduce((prev, data) => {
          return prev + data.quantity
        }, 0)
        dispatch(addcount(totalproducts))
      }
      updatecount()
    }
  }, [])

  useEffect(() => {
    const collectionid = id

    const getcoollection = async () => {
      const response = await axios.get(
        `https://e-commerce-2000.herokuapp.com/product/categories/${collectionid}`,
      )
      setLoader('loader')

      setData(response.data)
    }
    getcoollection()
  }, [id])
  return (
    <div>
      <div className="collectionmain">
        {loader ? (
          <>
            <h1 style={{ marginBottom: 30 }}>{id}</h1>
            <div className="collectionpage">
              {datas.map((phone) => (
                <Product collection={phone} key={phone.id} />
              ))}
            </div>
          </>
        ) : (
          <Loader />
        )}{' '}
      </div>
      <Footer />
    </div>
  )
}

export default Collections
