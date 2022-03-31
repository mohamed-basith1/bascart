import React, { useEffect, useState } from 'react'
import './Editscreen.css'
import axios from '../component/axios'
import { useNavigate } from 'react-router-dom'

const Editscreen = () => {
  const [state, setState] = useState([])
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [user, setUser] = useState('')
  const navigation = useNavigate()
  useEffect(() => {
    const useremail = window.localStorage.getItem('userenteremail')
    setUser(useremail)

    const getuserdetails = async () => {
      const response = await axios.get(`user/findname/${useremail}`)
      console.log(response.data)

      setState(response.data)
    }
    getuserdetails()
  }, [])

  const update = (e) => {
    e.preventDefault()
    const address1 = address === '' ? state.address : address
    const pincode1 = pincode === '' ? state.pincode : pincode
    const data = { address: address1, pincode: pincode1 }
    console.log(data)
    console.log(user)
    const updateaddress = async () => {
      const response = await axios.put(`/user/${user}`, data)
      console.log(response.data)
      navigation('/cart')
    }

    updateaddress()
  }
  return (
    <div className="editscreens">
      <div className="editscreendivs">
        <h1>Edit Your Location</h1>
        <p style={{ fontWeight: 800 }}> Email : {state.email}</p>
        <form onSubmit={update}>
          <h2>Address</h2>

          <textarea
            defaultValue={state.address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <h2>pincode</h2>
          <input
            defaultValue={state.pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
          <div>
            <button className="updatebtn" type="submit" onClick={update}>
              update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Editscreen
