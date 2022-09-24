import type { NextPage, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useState} from 'react'
import AdsContainer from '../components/home/ads/container'
import PostContainer from '../components/home/post/container'
import session from '../utils/session'
import api from '../utils/api'
import HomeContainer from '../components/home/HomeContainer'

const Home: NextPage = (props:any) => {

  const [posts, setPosts] = useState<Array<any>>(props.posts)

  const onSearch = async(value:string) => {

    const data = await api.get('/posts?query=' + value)
    setPosts(data.data.data)
  }

  const postsRefresh = async () => { 
    const data = await api.get('/posts')
    setPosts(data.data.data)
  }


  return (

    <HomeContainer user={props.user} onSearch={onSearch}>
      <Head>
        <title>Início</title>
        <meta name="Início" content="Página Inicial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdsContainer />
      <PostContainer posts={posts} refresh={postsRefresh} user={props.user} />
          <footer className="text w-full py-6 text-center">
            <p className='text-gray-300'>Gestão de Cadeia de suplementos agricolas</p>
          </footer>
    </HomeContainer>
  )
}


export async function getServerSideProps(context:GetServerSidePropsContext) {

  let user:any;
  
  try {
    user = await session.getLoggedUser(context)
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/login',
      }
    }
  }
  
  const posts = await api.get('/posts')


  return {
    props: {
      user: user,
      posts: posts.data.data,
    },
  }
}

export default Home
