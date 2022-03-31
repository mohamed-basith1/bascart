import { CircularProgress } from '@mui/material'
import React from 'react'
import './Loader.css'

const Loader = () => {
  return (
    <div className="loader">
      <CircularProgress color="success" />
    </div>
  )
}

export default Loader
