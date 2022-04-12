import type { GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import api from '../../utils/api'
import session from '../../utils/session'
import { FiFacebook, FiTwitter } from 'react-icons/fi'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import dateUtil from '../../utils/dateUtil'
import Link from 'next/link'
import Head from 'next/head'
import LeftSidebar from '../../components/home/leftSidebar'
import Navbar from '../../components/home/navbar'
import { MdDeleteForever } from 'react-icons/md'

const Post: NextPage = (props: any) => {
  const [post, setPost] = useState<any>()
  const [comment, setComment] = useState<string>()
  const [comments, setComments] = useState<Array<any>>([])


  console.log(props.user)

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const findPost = async () => {
      api.defaults.headers.common['Authorization'] = 'Bearer ' + props.token
      await api
        .get(`/posts/${id}/`)
        .then((data: any) => {
          setPost(data.data)
          api.get(`/posts/${id}/comments`).then((data) => {
            setComments(data.data.data.reverse())});
        })
        .catch(() => {
          router.push('/')
        })
    }
    findPost()
  }, [])

  const submitCommentHandler = async (e: any) => {
    e.preventDefault()
    console.log(comment)
    if(comment){
      await toast.promise(
        api
        .post(`/posts/${id}/comments`, { comment })
        .then((c) => {
          setComments([...comments, c.data])
          setComment('')
        })
        .catch(() => {}),
      {
        pending: 'Enviando o comentário!',
        success: 'Comentário enviado com sucesso! 👌',
        error: 'Falha ao comentar! 🤯',
      }
    )
    }
  }

  const deletePost = async () => {
      try{
      await toast.promise(
        api
          .delete('posts/'+id)
          .then((data: any) => {
            router.push({ pathname: '/' })
          }),
          {
          pending: 'Enviando o artigo!',
          success: 'Artigo enviado com sucesso! 👌',
          error: 'Erro ao enviar artigo! 🤯',
        }
      )
      }catch(e){
      }
    }

  if (post) {
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
          <Navbar user={props.user} onSearch={() => {}} showSearchBox={false}/>
          <div className="h-[calc(100vh-115px)] overflow-auto">
            <div className="flex flex-col p-4 md:px-20">
              <ToastContainer />
              <img
                className="mb-8 h-40 w-full"
                src="https://avatar.oxro.io/avatar.svg?name=Joel+Augusto"
              />
              {props.user.role === 'ADMIN' ? <div className='flex flex-row-reverse'>
                <button className='bg-red-300 flex text-black p-2 rounded-md gap-2' onClick={deletePost}>
                  Apagar
                  <MdDeleteForever className="text-red-500" size={27}/>
                </button>
              </div>: null}
              <h1 className="mb-8 text-2xl">{post.title}</h1>
              <div className="flex justify-between border-b-2 border-gray-200 pb-4">
                <div className="">
                  <p className="text-sm text-gray-500">
                    {post.visualizations} visualizações
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FiFacebook size={25} />
                  <FiTwitter size={25} />
                </div>
              </div>
              <div className="px-1 py-4">
                <p className="whitespace-normal">{post.body}</p>
              </div>
              <div className="flex gap-5 border-t-2 border-gray-200 py-5">
                <img
                  className="h-20 w-20 rounded-full"
                  src="https://avatar.oxro.io/avatar.svg?name=Joel+Augusto"
                />
                <div className="grid place-content-center">
                  <p>Escrito por: </p>
                  <strong>
                    {post.username ? post.username : 'Autor Desconhecido!'}
                  </strong>
                  <p className="text-sm text-gray-500">
                    {dateUtil.timeAgo(post.createdAt)}
                  </p>
                </div>
              </div>
              <div className="mt-10 rounded-md">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="mt-5 rounded-lg border border-gray-200"
                  >
                    <Link href={`users/${comment.user.id}`}>
                      <div className="flex items-center gap-4 border border-b-2 p-4">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://avatar.oxro.io/avatar.svg?name=Joel+Augusto"
                        />
                        <strong className="">
                          {comment.user.name} -{' '}
                          {dateUtil.timeAgo(comment.createdAt)}
                        </strong>
                      </div>
                    </Link>
                    <p className="p-4 text-gray-800 whitespace-pre-wrap">{comment.comment}</p>
                  </div>
                ))}
              </div>
              <form
                className="mt-16 flex flex-col items-center justify-center"
                onSubmit={submitCommentHandler}
              >
                <textarea
                  className="mb-2 h-28 w-full rounded-md border-2 border-gray-200 py-2 px-4"
                  placeholder="Insira o seu comentário"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value)
                  }}
                ></textarea>
                <button className="h-10 w-full rounded-md bg-emerald-500 text-white">
                  Comentar
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    )
  } else {
    return <div></div>
  }
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

