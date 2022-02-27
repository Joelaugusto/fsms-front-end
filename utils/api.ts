import axios from "axios"


const api = axios.create({
  baseURL: 'https://localhost:8080/api/v1/',
  timeout: 1000,
})

api.defaults.headers.common['Authorization'] ="Bearer ";

api.interceptors.request.use(async (config: any) => {
  config.headers.Authorization = `Bearer ${getCookie('accessToken')}`
  return config
})

function getCookie(cname:any) {

  if(typeof document === "undefined"){
    return ''
  }

  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export default api;
