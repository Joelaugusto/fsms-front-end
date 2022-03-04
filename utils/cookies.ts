const setAccessToken = (token: string, time: number):void => {
  let date = new Date()
  date.setTime(date.getTime() + time)
  document.cookie = `accessToken=${token};expires=${date.toUTCString()};path=/;`
}


function getCookie(cname: any):string {
  if (typeof document === 'undefined') {
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

const cookies = {setAccessToken, getCookie}

export default cookies;
