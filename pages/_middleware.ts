import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {

  // const url = request.nextUrl.clone()
  

  // const { accessToken } = request.cookies;

  // //url.pathname = accessToken;

  // const resp = await fetch('http://localhost:8080/api/v1/auth/me', {
  //   method: 'get',
  //   headers: new Headers({
  //     Authorization: 'Bearer ' + accessToken,
  //   }),
  // })
  

  // if (resp.ok) {
  //     return NextResponse.next()
  //     // props: { user: await resp.json() }, // will be passed to the page component as props
    
  // } else {
  //   return NextResponse.redirect(url)
  // }

  
  
}
