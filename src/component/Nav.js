import React, { useEffect, useState } from 'react'
import './Nav.css'
import SearchIcon from '@mui/icons-material/Search'
import { Link, useNavigate } from 'react-router-dom'
import { Badge } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { useSelector } from 'react-redux'
import axios from './axios'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'

const Nav = ({ click }) => {
  const [user, setUser] = useState('')
  const [searchint, setSearchint] = useState('')
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const count = useSelector((state) => state.cart.navcount)

  useEffect(() => {
    const useremail = window.localStorage.getItem('userenteremail')
    if (useremail === null) {
      console.log('user not signin')
    } else {
      setUser(useremail)
    }
    const getalldata = async () => {
      const response = await axios.get(
        'https://e-commerce-2000.herokuapp.com/product/',
      )

      setData(response.data)
    }
    getalldata()
  }, [])
  const logout = () => {
    window.localStorage.clear()
    window.location.reload()
  }
  const searchclicked = (e) => {
    setSearchint('')
    navigate(`/product/${e.id}`)
  }
  const searchform = (e) => {
    e.preventDefault()

    if (searchint !== '') {
      setSearchint('')
      navigate(`/searchscreen/${searchint}`)
    }
  }

  return (
    <div>
      <div className="navbar">
        <>
          <div className="logo" onClick={() => navigate('/')}>
            <img src="/newlogo.png" alt="logo" className="logoimg" />
            <span style={{ color: 'rgb(17, 117, 65)' }}>Bas</span>
            cart
          </div>
          <div className="searchbarempty"></div>
          <div className="signin">
            {user === '' ? (
              <>
                <Link
                  to={'/signin'}
                  style={{ textDecoration: 'none' }}
                  className="signbtn"
                >
                  sign in
                </Link>
                <Link
                  to={'/register'}
                  style={{ textDecoration: 'none' }}
                  className="regbtn"
                >
                  register
                </Link>
                <Badge
                  onClick={() => navigate('/cart')}
                  badgeContent={count}
                  color="success"
                  style={{ marginTop: 5, marginRight: 3, cursor: 'pointer' }}
                >
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </>
            ) : (
              <div className="signin">
                <button className="logoutbtn" onClick={logout}>
                  logout
                </button>
                <Badge
                  onClick={() => navigate('/cart')}
                  badgeContent={count}
                  color="success"
                  style={{ marginTop: 5, marginRight: 3, cursor: 'pointer' }}
                >
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </div>
            )}
          </div>
          <div className="menubar">
            <Badge
              onClick={() => navigate('/cart')}
              badgeContent={count}
              color="success"
              style={{ marginRight: 20 }}
            >
              <ShoppingCartOutlinedIcon />
            </Badge>
            <div onClick={click} style={{ marginRight: 10 }}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
        </>
        <div className="newsearch">
          <div className="searchbar">
            <form onSubmit={searchform}>
              <input
                placeholder="search bar"
                onChange={(e) => setSearchint(e.target.value)}
                value={searchint}
              />

              <div className="serachicon" style={{ backgroundColor: 'green' }}>
                <button
                  type="submit"
                  style={{ border: 'none', backgroundColor: 'green' }}
                >
                  <SearchIcon style={{ color: 'white' }} />
                </button>
              </div>
            </form>
          </div>
          {searchint ? (
            <div className="searchlist">
              {data
                .filter((val) => {
                  if (searchint === '') {
                    return val
                  } else if (
                    val.products.toLowerCase().includes(searchint.toLowerCase())
                  ) {
                    return val
                  }
                })
                .slice(0, 5)
                .map((list) => (
                  <div
                    className="searchitem"
                    onClick={() => searchclicked(list)}
                    key={list.id}
                  >
                    {list.products}
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Nav
