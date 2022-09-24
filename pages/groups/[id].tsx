import type { GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import api from '../../utils/api'
import session from '../../utils/session'
import HomeContainer from '../../components/home/HomeContainer'
import PostContainer from '../../components/home/post/container'

const Post: NextPage = (props: any) => {
  const [posts, setPosts] = useState<any>(props.posts)
  const [comment, setComment] = useState<string>()
  const [comments, setComments] = useState<Array<any>>([])



  const router = useRouter()
  const { id } = router.query

  const postsRefresh = async () => {
    const data = await api.get(`/groups/${id}/posts`)
    setPosts(data.data.data)
  }
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
      {/* <AdsContainer /> */}
      <PostContainer
        posts={posts}
        refresh={postsRefresh}
        user={props.user}
        groupId={Number.parseInt(`${id}`)}
        groupName={props.group.name}
      />
    </HomeContainer>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let user

  const { id } = context.params as any;
  try {
    user = await session.getLoggedUser(context)
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/login',
      }
    }
  }


  const [posts, group] = await Promise.all(
    [
      api.get(`/groups/${id}/posts`),
      api.get(`/groups/${id}`)
    ]
  )


  return {
    props: {
      user,
      posts: posts.data.data,
      group: group.data,
    },
  }
}
export default Post

