import axios from "axios";
import cookie from './cookies'


const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/`,
  timeout: 60000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  
  if (typeof document !== 'undefined') {
    config.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookie.getCookie('accessToken')}`
    }
  }
  
  return config
})


export default api;