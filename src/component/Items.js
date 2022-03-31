import React from 'react'
import './Items.css'
import { Link } from 'react-router-dom'

const Items = ({ name }) => {
  return (
    <Link to={`/collections/${name.title}`} className="categorie">
      <img src={`${name.image}`} alt="" />
      <div className="titles">
        <p className="ptag">{name.title}</p>
        {/* <Link to={`/collections/${name.title}`} className="showbtn">
          Show
        </Link> */}
      </div>
    </Link>
  )
}

export default Items
