import React, { useEffect, useState } from 'react'
import './SearchScreen.css'
import { useParams } from 'react-router-dom'
import axios from '../component/axios'
import Loader from '../component/Loader'
import Product from '../component/Product'
import Footer from '../component/Footer'
const SearchScreen = () => {
  const { id } = useParams()
  const [alldata, setAlldata] = useState([])
  const [filterdata, setFilterdata] = useState([])
  const [loader, setLoader] = useState('')

  useEffect(() => {
    const getallproduct = async () => {
      const response = await axios.get(
        'https://e-commerce-2000.herokuapp.com/product/',
      )
      setAlldata(response.data)
      const filtered = response.data.filter((val) => {
        if (val.products.toLowerCase().includes(id.toLowerCase())) {
          return val
        } else {
          return null
        }
      })
      setFilterdata(filtered)
      setLoader('loader')
    }
    getallproduct()
  }, [id])

  return (
    <div>
      <div className="collectionmain">
        {loader ? (
          <>
            <div className="collectionpage">
              {filterdata.map((items) => {
                return <Product collection={items} key={items.id} />
              })}
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
      <Footer />
    </div>
  )
}

export default SearchScreen
