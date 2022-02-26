import axios from "axios"


const api = axios.create({
  baseURL: 'https://localhost:8080/api/v1/',
  timeout: 1000,
})

api.defaults.headers.common['Authorization'] ="Bearer ";

export default api;
