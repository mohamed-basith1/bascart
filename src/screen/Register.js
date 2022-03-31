import React, { useState } from 'react'
import './Register.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
import axios from '../component/axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

import { CircularProgress } from '@mui/material'
const Register = () => {
  const [loading, setloading] = useState(false)
  const navigation = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      address: '',
      pincode: '',
    },
    validationSchema: yup.object({
      name: yup.string().required('name is required'),
      email: yup.string().required('email is required').email(),
      password: yup
        .string()
        .required('password is required')
        .min(8, 'password minimum 8 character is required')
        .max(15, 'maximum 15 characters only'),
      address: yup.string().required('address is required'),
      pincode: yup
        .string()
        .required('pincode is required')
        .min(6, 'minimum 6 character is required'),
    }),
    onSubmit: (values) => {
      const id = uuidv4()
      const data = {
        email: values.email,
        password: values.password,
        address: values.address,
        name: values.name,
        pincode: values.pincode,
        id: id,
      }
      const Register = async () => {
        setloading(true)
        const response = await axios.post('/user/register', data)
        if (response.data === 'email is already exits') {
          setloading(false)
          toast.warn('Email is already exits')
        } else if (response.data === 'succesfully submited') {
          toast.success('Successfully submited')
          navigation('/signin')
        }
      }
      Register()
    },
  })
  return (
    <div className="register">
      <div className="registerfield">
        <ToastContainer />
        <div className="heading">
          <span style={{ color: 'rgb(17, 117, 65)' }}>R</span>egister
        </div>
        <form onSubmit={formik.handleSubmit}>
          <input
            placeholder="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name ? (
            <p style={{ color: 'red', fontSize: 10 }}>{formik.errors.name}</p>
          ) : null}
          <input
            placeholder="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email ? (
            <p style={{ color: 'red', fontSize: 10 }}>{formik.errors.email}</p>
          ) : null}
          <input
            placeholder="password"
            type="password"
            name="password"
            autoComplete="new-password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password ? (
            <p style={{ color: 'red', fontSize: 10 }}>
              {formik.errors.password}
            </p>
          ) : null}

          <textarea
            className="textarea"
            placeholder="address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
          />
          {formik.errors.address ? (
            <p style={{ color: 'red', fontSize: 10 }}>
              {formik.errors.address}
            </p>
          ) : null}
          <input
            placeholder="pincode"
            name="pincode"
            value={formik.values.pincode}
            onChange={formik.handleChange}
          />
          {formik.errors.pincode ? (
            <p style={{ color: 'red', fontSize: 10 }}>
              {formik.errors.pincode}
            </p>
          ) : null}
          <button className="rigbtn" disabled={loading}>
            {loading ? (
              <CircularProgress
                className="loadingcircle"
                size={13}
                color="success"
              />
            ) : (
              'Submit'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
