import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

export default api;