import axios from "axios";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + 'api/v1/',
  timeout: 60000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

export default api;