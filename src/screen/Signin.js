import React, { useState } from 'react'
import './Register.css'
import { useFormik } from 'formik'
import './Signin.css'
import * as yup from 'yup'
import axios from '../component/axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
const Signin = () => {
  const navigation = useNavigate()
  const [loading, setloading] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().email().required('email is required'),
      password: yup
        .string()
        .required('password is required')
        .min(8, 'min 8 cgaracters is required')
        .max(15, 'max 15 charater'),
    }),
    onSubmit: (values) => {
      setloading(true)
      const data = values
      const signinaxios = async () => {
        const response = await axios.post('/user/signin', data)
        console.log(response.data)
        if (response.data === 'check your password') {
          setloading(false)
          toast.warn('check your password')
        } else if (response.data === 'user is not found ') {
          setloading(false)
          toast.error('user not fount')
        } else if (response.data) {
          toast.success('you are enter')
          window.localStorage.setItem('userentertoken', response.data)
          window.localStorage.setItem('userenteremail', values.email)
          navigation('/')
          window.location.reload()
        }
      }
      signinaxios()
    },
  })

  return (
    <div className="register">
      <div className="registerfield">
        <ToastContainer />
        <div className="heading">
          <span style={{ color: 'rgb(17, 117, 65)' }}>S</span>ign in
        </div>

        <form onSubmit={formik.handleSubmit}>
          <input
            type=" email"
            placeholder="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email ? (
            <p style={{ color: 'red', fontSize: 10 }}>{formik.errors.email}</p>
          ) : null}
          <input
            type="password"
            placeholder="password"
            autoComplete="new-password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password ? (
            <p style={{ color: 'red', fontSize: 10 }}>
              {formik.errors.password}
            </p>
          ) : null}
          <button className="rigbtn" disabled={loading}>
            {loading ? (
              <CircularProgress
                className="loadingcircle"
                color="success"
                size={13}
              />
            ) : (
              'Sign in'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signin
