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
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from "react-toastify";





const PostContainer = (props: { posts: Array<any>, refresh: Function}) => {
  
  const [showModal, setShowModal] = useState<boolean>(false)

  const registNewPost = async (values: { title: string, body: string }, setSubmitting: Function) => {
    
    setSubmitting(true);

    try{
      await toast.promise(
        api
          .post('posts', values)
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
    <div className="fixed w-screen h-screen flex justify-center items-center flex-col bg-white top-0 left-0 z-10 p-5">
      <h1 className="text-3xl m-20">Registrar novo Artigo</h1>
      <div className="w-full md:w-1/2 bg-white">
        <MdClose size={25} className="fixed top-5 right-5" onClick={() => {setShowModal(false)}}/>
        <Formik
        initialValues={{ title: '', body: '' }}
        validationSchema={Yup.object({
          title: Yup.string().required('Este campo é Obrigatório').min(2, 'O Título deve ter pelo menos 2 caracteres'),
          body: Yup.string().required('Este campo é Obrigatório').min(10, 'O corpo deve ter pelo menos 10 caracteres'),
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
              placeholder='Digite o corpo do artigo'
            />
            <Input type="submit"  value='Adicionar Artigo' icon={<BsFileEarmarkPlus/>}/>
          </Form>
      </Formik>
      </div>
    </div>
  )

  return (
    <div className="mx-6 my-20">
      <ToastContainer/>
      {showModal ? modal : null}
      <div className="flex items-center gap-2">
        <h1 className="my-6 text-3xl">Postagens</h1>
        <button className="bg-emerald-600 flex text-white p-2 rounded-md gap-2" onClick={()=> {setShowModal(true)}}>
         Adicionar mais <FiPlusCircle size={25}/>
        </button>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {props.posts.map((post) => (
          <Post
            id={post.id}
            key={post.id}
            title={post.title}
            views={post.visualizations}
            date={dateUtil.timeAgo(post.createdAt)}
            userImage="https://avatar.oxro.io/avatar.svg?name=Joel+Augusto"
            postBg="https://avatar.oxro.io/avatar.svg?name=Joel+Augusto"
          />
        ))}
      </div>
    </div>
  )
}


export default PostContainer;