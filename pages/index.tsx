import type { NextPage, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useState} from 'react'
import AdsContainer from '../components/home/ads/container'
import LeftSidebar from '../components/home/leftSidebar'
import Navbar from '../components/home/navbar'
import PostContainer from '../components/home/post/container'
import session from '../utils/session'
import api from '../utils/api'

const Home: NextPage = (props:any) => {

  api.defaults.headers.common['Authorization'] = 'Bearer ' + props.token

  const [posts, setPosts] = useState<Array<any>>(props.posts)

  const onSearch = async(value:string) => {

    const data = await api.get('/posts?query=' + value)
    setPosts(data.data.data)
  }

  

  return (
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
        <Navbar user={props.user} onSearch={onSearch} />
        <div className="h-[calc(100vh-240px)] overflow-auto">
          <AdsContainer />
          <PostContainer posts={posts} />
          <footer className="text w-full py-6 text-center">
            <p>Gestão de Cadeia de suplementos agricolas</p>
          </footer>
        </div>
      </main>
    </div>
  )
}


export async function getServerSideProps(context:GetServerSidePropsContext) {

  const user = await session.getLoggedUser(context)

  if (!user.props) {
    return user
  }

  api.defaults.headers.common['Authorization'] = 'Bearer ' + context.req.cookies.accessToken
  
  const posts = await api.get('/posts')


  return {
    props: {
      user: user.props.user,
      posts: posts.data.data,
      token: context.req.cookies.accessToken, //change after
    },
  }
}

export default Home
