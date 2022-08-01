import type { GetServerSidePropsContext } from 'next'
import api from './api'


const getLoggedUser = async (context: GetServerSidePropsContext) => {

  api.defaults.headers.common['Authorization'] = 'Bearer ' + context.req.cookies.accessToken
  const resp = api.get('auth/me');

  if ((await resp).status == 200) {
    return {
      props: { user: await (await resp).data }, // will be passed to the page component as props
    }
  } else {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }
}

const session = { getLoggedUser }

export default session
