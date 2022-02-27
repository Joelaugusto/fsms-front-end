const setAccessToken = (token: string, time: number):void => {
  let date = new Date()
  date.setTime(date.getTime() + time)
  document.cookie = `accessToken=${token};expires=${date.toUTCString()};path=/;`
}

// const getCookie = () => {
//   const value = document.cookie;

//   console.log(value)
// }

// getCookie()


export default {setAccessToken}
