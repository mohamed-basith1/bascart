import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    product: [],
    navcount: 0,
    total: [],
  },
  reducers: {
    addcart: (state, action) => {
      state.product.push(action.payload)
      state.total.push(action.payload.quantity * action.payload.price)
    },
    addcount: (state, action) => {
      state.navcount = action.payload
    },
    inccount: (state, action) => {
      state.navcount += 1
    },
    totalprice: (state, action) => {
      state.total = action.payload
    },
    removeitem: (state, action) => {
      console.log(action.payload)
      const check = state.product.filter((arrow) => arrow.id !== action.payload)
      state.product = check
    },
  },
})

export const { addcart, addcount, inccount, removeitem } = cartSlice.actions

export default cartSlice.reducer
