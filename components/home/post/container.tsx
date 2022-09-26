import Post from "./post";

import dateUtil from "../../../utils/dateUtil";
import { FiPlusCircle } from "react-icons/fi";
import { useState } from "react";
import Input from "../../global/Input";
import { Formik, Form } from "formik";
import * as Yup from 'yup'
import { MdClose } from "react-icons/md";
import { BsFileEarmarkPlus } from "react-icons/bs";
import api from "../../../utils/api";
import { toast} from "react-toastify";
import { ImageUploader } from "../../global/ImageUploader";
import AddVideo from "./addVideo";




const PostContainer = (props: {
  posts: Array<any>, user: any, refresh: Function,
  groupId?: Number | undefined, groupName?: string | undefined,

}) => {
  
  const [showModal, setShowModal] = useState<boolean>(false)
  const [images, setImages] = useState<Array<any>>([])
  const [videosLink, setVideosLink] = useState<Array<string>>([])

  const registNewPost = async (values: { title: string, body: string }, setSubmitting: Function) => {
    setSubmitting(true);
    

    try {
      await toast.promise(
        api
          .post(props.groupId ? `groups/${props.groupId}/posts`: 'posts', {...values, images, videosLink})
          .then((data: any) => {
            props.refresh()
            setShowModal(false)
          }),
          {
          pending: 'Enviando o artigo!',
          success: 'Artigo enviado com sucesso! 👌',
          error: 'Erro ao enviar artigo! 🤯',
        }
      )
      }catch(e){
        setSubmitting(false)
      }
    setSubmitting(false)
   }
  

  const modal = (
    <div className="fixed top-0 left-0 z-10 flex h-screen w-screen flex-col items-center justify-center overflow-auto bg-white p-5">
      <h1 className=" m-20 md:text-3xl">Registrar novo artigo</h1>
      <div className="w-full bg-white md:w-1/2">
        <ImageUploader setImages={setImages} />
        <AddVideo onUpdateLinks={(links: Array<any>) => {setVideosLink(links)}}/>
        <MdClose
          size={25}
          className="fixed top-5 right-5"
          onClick={() => {
            setShowModal(false)
          }}
        />
        <Formik
          initialValues={{ title: '', body: '' }}
          validationSchema={Yup.object({
            title: Yup.string()
              .required('Este campo é Obrigatório')
              .min(2, 'O Título deve ter pelo menos 2 caracteres'),
            body: Yup.string()
              .required('Este campo é Obrigatório')
              .min(10, 'O corpo deve ter pelo menos 10 caracteres'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            registNewPost(values, setSubmitting)
          }}
        >
          <Form noValidate>
            <Input
              label="Título"
              type="text"
              name="title"
              placeholder="Digite o título do artigo"
            />
            <Input
              label="Artigo"
              type="textarea"
              name="body"
              placeholder="Digite o corpo do artigo"
            />
            <Input
              type="submit"
              value="Adicionar Artigo"
              icon={<BsFileEarmarkPlus />}
            />
          </Form>
        </Formik>
      </div>
    </div>
  )

  return (
    <div className="mx-6 mt-10">
      {showModal ? modal : null}
      <div className="flex items-center gap-2">
        <h1 className="my-6 text-xl">
          Postagens
          {props.groupName ? (
            <>
              <span> do grupo</span>
              <span className="text-emerald-600"> {props.groupName}</span>
            </>
          ) : null}
        </h1>
        {props.groupId || props.user.role === 'ADMIN' ? (
          <button
            className="flex items-center gap-2 rounded-md bg-emerald-600 py-1 px-2 text-white"
            onClick={() => {
              setShowModal(true)
            }}
          >
            Adicionar mais <FiPlusCircle size={18} />
          </button>
        ) : null}
      </div>
      <div className="mt-2 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {props.posts.map((post) => (
          <Post
            id={post.id}
            key={post.id}
            title={post.title}
            views={post.visualizations}
            date={dateUtil.timeAgo(post.createdAt)}
            userImage={
              process.env.NEXT_PUBLIC_BASE_DOWNLOAD_URL +
              post.userProfilePhotoUrl
            }
            postBg={
              process.env.NEXT_PUBLIC_BASE_DOWNLOAD_URL + post.images[0]?.path
            }
          />
        ))}
      </div>
    </div>
  )
}


export default PostContainer;