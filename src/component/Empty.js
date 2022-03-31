import React from 'react'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined'

const Empty = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div>
        <h2>your bag is empty</h2>
      </div>
      <div>
        <LocalMallOutlinedIcon
          style={{ width: 50, height: 50, color: 'green' }}
        />
      </div>
    </div>
  )
}

export default Empty
