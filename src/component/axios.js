import axios from 'axios'

const instance = axios.create({ baseURL: 'https://e-cart-2000.herokuapp.com' })

export default instance
