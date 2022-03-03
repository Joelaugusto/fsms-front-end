import type { GetServerSidePropsContext } from 'next'

const getLoggedUser = async (context: GetServerSidePropsContext) => {
  const { accessToken } = context.req.cookies


  const resp = await fetch('http://localhost:8080/api/v1/auth/me', {
    method: 'get',
    headers: new Headers({
      Authorization: 'Bearer ' + accessToken,
    }),
  })

  if (resp.ok) {
    return {
      props: { user: await resp.json() }, // will be passed to the page component as props
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
