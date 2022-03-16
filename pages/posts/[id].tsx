import type { GetServerSidePropsContext, NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import api from '../../utils/api'
import session from '../../utils/session'
import { FiFacebook, FiTwitter } from 'react-icons/fi'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import dateUtil from '../../utils/dateUtil'

const Post: NextPage = (props: any) => {
  const [post, setPost] = useState<any>()
  const [comment, setComment] = useState<string>()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const findPost = async () => {
      api.defaults.headers.common['Authorization'] = 'Bearer ' + props.token
      await api
        .get(`/posts/${id}/`)
        .then((data: any) => {
          setPost(data.data)
        })
        .catch(() => {
          router.push('/')
        })
    }
    findPost()
  }, [])

  const submitCommentHandler = async (e: any) => {
    e.preventDefault()
    

    await toast.promise(
        api
        .post(`/posts/${id}/comments`, { comment })
        .then(() => {
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

  if (post) {
    return (
      <main className="flex flex-col p-4">
        <ToastContainer />
        <img
          className="mb-8 h-40 w-full"
          src="https://avatar.oxro.io/avatar.svg?name=Joel+Augusto"
        />
        <h1 className="mb-8 text-2xl">{post.title}</h1>
        <div className="flex justify-between border-b-2 border-gray-200 pb-4">
          <div className="">
            <p className='text-gray-500'>{dateUtil.timeAgo(post.createdAt)}</p>
          </div>
          <div className="flex items-center gap-1">
            <FiFacebook />
            <FiTwitter />
          </div>
        </div>
        <div className="px-1 py-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            est nulla dignissimos eligendi esse neque laborum libero assumenda
            sequi architecto corporis ut, velit, consequatur obcaecati quam
            corrupti atque, tempora excepturi! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Accusamus excepturi nihil, maiores
            aliquid ea ex quos natus, atque temporibus corporis assumenda et!
            Porro, quia incidunt necessitatibus deserunt maxime magni ea. Lorem
            ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
            amet ab soluta modi unde exercitationem ex illum culpa fuga eveniet!
            Laudantium quod non reprehenderit quia corrupti saepe fugiat eveniet
            nostrum!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            est nulla dignissimos eligendi esse neque laborum libero assumenda
            sequi architecto corporis ut, velit, consequatur obcaecati quam
            corrupti atque, tempora excepturi! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Accusamus excepturi nihil, maiores
            aliquid ea ex quos natus, atque temporibus corporis assumenda et!
            Porro, quia incidunt necessitatibus deserunt maxime magni ea. Lorem
            ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
            amet ab soluta modi unde exercitationem ex illum culpa fuga eveniet!
            Laudantium quod non reprehenderit quia corrupti saepe fugiat eveniet
            nostrum!
          </p>
        </div>
        <div className="flex gap-5 border-t-2 border-gray-200 py-5">
          <img
            className="h-20 w-20 rounded-full"
            src="https://avatar.oxro.io/avatar.svg?name=Joel+Augusto"
          />
          <div className="grid place-content-center">
            <p>Escrito por</p>
            <strong>
              {post.username ? post.username : 'Autor Desconhecido!'}
            </strong>
          </div>
        </div>
        <form
          className="mt-16 flex flex-col items-center justify-center"
          onSubmit={submitCommentHandler}
        >
          <input
            className="mb-2 h-10 w-full rounded-md border-2 border-gray-200 px-2"
            placeholder="Insira o seu comentário"
            value={comment}
          />
          <button className="h-10 w-full rounded-md bg-emerald-500 text-white">
            Comentar
          </button>
        </form>
      </main>
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
