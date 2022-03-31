import React, { useEffect, useState } from 'react'
import './App.css'
import Nav from './component/Nav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './screen/Home'
import Signin from './screen/Signin'
import Register from './screen/Register'
import Cart from './screen/Cart'
import SideDrawer from './component/SideDrawer'
import ProductScreen from './screen/ProductScreen'
import Collections from './screen/Collections'
import Editscreen from './screen/Editscreen'
import SearchScreen from './screen/SearchScreen'

function App() {
  const [user, setUser] = useState('')
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const useremail = window.localStorage.getItem('userenteremail')
    console.log(useremail)
    if (useremail === null) {
      console.log('user not signin')
    } else {
      setUser(useremail)
      console.log('esle statement')
    }
  }, [])

  return (
    <Router>
      <Nav click={() => setToggle(!toggle)} />
      <SideDrawer show={toggle} click={() => setToggle(!toggle)} state={user} />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/collections/:id" element={<Collections />} />
          <Route path="/editscreen" element={<Editscreen />} />
          <Route path="/searchscreen/:id" element={<SearchScreen />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
