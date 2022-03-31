import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlicer'
import cartReducer from './cartSlicer'

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
})
