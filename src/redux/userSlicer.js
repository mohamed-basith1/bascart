import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    address: '',
    product: [],
  },
  reducers: {
    login: (state, action) => {
      console.log(action.payload)
      state.name = action.payload.name
      state.address = action.payload.address
    },
  },
})

export const { login } = userSlice.actions

export default userSlice.reducer
