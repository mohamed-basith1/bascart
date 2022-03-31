import React from 'react'
import './SideDrawer.css'
import { Link } from 'react-router-dom'

const SideDrawer = ({ show, click, state }) => {
  const drawerclass = ['sidedrawer']
  if (show) {
    drawerclass.push('show')
  }

  const logout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <div className={drawerclass.join(' ')}>
      <div className="xbtn" onClick={click}>
        x
      </div>
      <div className="contents">
        <Link to={'/'} className="items" onClick={click}>
          Home
        </Link>
        <Link to={'/cart'} className="items" onClick={click}>
          {' '}
          Cart{' '}
        </Link>
        {state === '' ? (
          <>
            <Link to={'/signin'} className="items" onClick={click}>
              Sign in
            </Link>
            <Link to={'/register'} className="items" onClick={click}>
              Register
            </Link>
          </>
        ) : (
          <div className="items" onClick={logout}>
            Logout
          </div>
        )}
      </div>
    </div>
  )
}

export default SideDrawer
