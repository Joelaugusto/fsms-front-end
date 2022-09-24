import type { GetServerSidePropsContext } from 'next'
import api from './api'


const getLoggedUser = async (context: GetServerSidePropsContext) => {

  api.defaults.headers.common['Authorization'] = 'Bearer ' + context.req.cookies.accessToken
  const user = (await api.get('auth/me')).data;
  
  return user;


}

const session = { getLoggedUser }

export default session
