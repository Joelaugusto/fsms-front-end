import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import api from '../utils/api'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // if (url.pathname.includes('auth')) {
  //   url.pathname = '/auth/login'
  //   return NextResponse.redirect(url)
  // }

 await api.get('auth/me').then(() => {
  url.pathname = '/true'
  return NextResponse.redirect(url)
 }).catch(() => {
  url.pathname = '/else'
  return NextResponse.redirect(url)
 });


  
  
}
