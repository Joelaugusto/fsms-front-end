import type { NextPage, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import AdsContainer from '../components/home/ads/container'
import LeftSidebar from '../components/home/leftSidebar'
import Navbar from '../components/home/navbar'
import PostContainer from '../components/home/post/container'
import api from '../utils/api'

const Home: NextPage = (props:any) => {




  return (
    <div>
      <div className="flex">
        <Head>
          <title>Início</title>
          <meta name="Início" content="Página Inicial" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="hidden h-screen w-2/5 border-r bg-white md:flex md:w-1/4">
          <div className="mx-auto py-10">
            <h1 className="mb-10 cursor-pointer text-2xl font-bold text-emerald-400 duration-150">
              GCSA
            </h1>
            <LeftSidebar />
          </div>
        </div>
        <main className="min-h-screen w-full bg-white">
          <Navbar user={props.user}/>
          <AdsContainer />
          <PostContainer />
        </main>
      </div>
      <footer className="w-full text-center py-6 text">
        <p>Gestão de Cadeia de suplementos agricolas</p>
      </footer>
    </div>
  )
}


export async function getServerSideProps(context:GetServerSidePropsContext) {


  const { accessToken } = context.req.cookies

  const resp = await fetch('http://localhost:8080/api/v1/auth/me', {
    method: 'get',
    headers: new Headers({
      Authorization: 'Bearer ' + accessToken,
    }),
  });


  if(resp.ok){
    return {
      props: { user: await resp.json() }, // will be passed to the page component as props
    }
  }else{
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }
}

export default Home
