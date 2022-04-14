import type { GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import api from '../../utils/api'
import session from '../../utils/session'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import HomeContainer from '../../components/home/HomeContainer'
import AdsContainer from '../../components/home/ads/container'
import PostContainer from '../../components/home/post/container'

const Post: NextPage = (props: any) => {
  const [post, setPost] = useState<any>()
  const [comment, setComment] = useState<string>()
  const [comments, setComments] = useState<Array<any>>([])



  const router = useRouter()
  const { id } = router.query

  // useEffect(() => {
  //   const findPost = async () => {
  //     api.defaults.headers.common['Authorization'] = 'Bearer ' + props.token
  //     await api
  //       .get(`/posts/${id}/`)
  //       .then((data: any) => {
  //         setPost(data.data)
  //         api.get(`/posts/${id}/comments`).then((data) => {
  //           setComments(data.data.data.reverse())});
  //       })
  //       .catch(() => {
  //         router.push('/')
  //       })
  //   }
  //   findPost()
  // }, [])

  // const submitCommentHandler = async (e: any) => {
  //   e.preventDefault()
  //   console.log(comment)
  //   if(comment){
  //     await toast.promise(
  //       api
  //       .post(`/posts/${id}/comments`, { comment })
  //       .then((c) => {
  //         setComments([...comments, c.data])
  //         setComment('')
  //       })
  //       .catch(() => {}),
  //     {
  //       pending: 'Enviando o comentário!',
  //       success: 'Comentário enviado com sucesso! 👌',
  //       error: 'Falha ao comentar! 🤯',
  //     }
  //   )
  //   }
  // }

  // const deletePost = async () => {
  //     try{
  //     await toast.promise(
  //       api
  //         .delete('posts/'+id)
  //         .then((data: any) => {
  //           router.push({ pathname: '/' })
  //         }),
  //         {
  //         pending: 'Enviando o artigo!',
  //         success: 'Artigo enviado com sucesso! 👌',
  //         error: 'Erro ao enviar artigo! 🤯',
  //       }
  //     )
  //     }catch(e){
  //     }
  //   }

  return (
    <HomeContainer onSearch={() => {}} user={props.user}>
      <AdsContainer />
      <PostContainer posts={[]} refresh={() => {}} user={props.user} />
    </HomeContainer>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await session.getLoggedUser(context)

  if (!user.props) {
    return user
  }

  return {
    props: {
      user: user.props.user,
      token: context.req.cookies.accessToken, //change after
    },
  }
}

export default Post

