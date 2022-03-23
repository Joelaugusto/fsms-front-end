import type { NextPage } from 'next'
import {useState } from 'react'

//icons
import { FcGoogle } from 'react-icons/fc'
import { FiLogIn} from 'react-icons/fi'

//components
import AuthContainer from '../../../components/auth/container'
import Input from '../../../components/global/Input'
import Separator from '../../../components/auth/separator'

import Head from 'next/head'
import Link from 'next/link'

import api from '../../../utils/api'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import { useRouter } from 'next/router'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import validate from '../../../utils/formValidate'

const Register: NextPage = () => {


  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)


  const sendEmail = async (form: {email: string, phone:string, password: string}) => {

    setIsSubmitting(true)

    const { email, phone, password } = form

    try {
      await api.get(`users/unique?email=${email}&phone=${phone}`).then((e) => {
        const email: string = e.data.email
        const phone: string = e.data.phone

        if (email) {
          toast.error('Email já registrado!')
        }

        if (phone) {
          toast.error('Telefone já registrado!')
        }

        if (email || phone) {
          setIsSubmitting(false)
          return
        }
      })
    } catch (error) {
      setIsSubmitting(false)
    }


    try{
      await toast.promise(
        api.post(`users/verify-email`, {email, phone, password}).then(() => {
          setTimeout(() => {router.push('/auth/login')}, 5000)
        }),
        {
          pending: 'Efectuando o registro',
          success:
            'Uma messagem com instruições de conclusão de registro foi enviada para o seu email! 👌',
          error: 'Falha ao efectuar registro! 🤯',
        }
      )
      }catch(e){
        setIsSubmitting(false)
      }
      setIsSubmitting(false)
  }



  return (
    <div>
      <Head>
        <title>Create New Account</title>
        <meta name="Register" content="Register Form" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthContainer title="Criar conta">
        <ToastContainer />
        <button className="flex h-9 items-center justify-center gap-2.5 rounded-md border border-solid border-zinc-700 bg-white">
          <FcGoogle size={20} />
          <span className="text-sm">Iniciar com conta Google</span>
        </button>
        <Separator>OU</Separator>
        <Formik
          initialValues={{
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={Yup.object({
            email: validate.email,
            phone: validate.phone,
            password: validate.password,
            confirmPassword: validate.passwordConfirm('password'),
          })}
          onSubmit={sendEmail}
        >
          <Form className="grid" noValidate>
            <div className="grid md:gap-4 md:grid-cols-2 ">
              <Input
                type="email"
                placeholder="Introduza o seu email"
                label="Email"
                name="email"
              />
              <Input
                type="text"
                placeholder="Introduza o seu número de celular"
                label="Número de celular"
                name="phone"
              />
            </div>
            <div className="grid md:gap-4 md:grid-cols-2">
              <Input
                type="password"
                placeholder="Introduza a senha"
                label="Senha"
                name="password"
              />
              <Input
                type="password"
                placeholder="Confirmar senha"
                label="Confirmar Senha"
                name="confirmPassword"
              />
            </div>
            <Input
              type="submit"
              value="Entrar"
              disabled={isSubmitting}
              icon={<FiLogIn size={20} />}
            />
          </Form>
        </Formik>
        <span className="text-center">
          Já tem conta?
          <Link href="/auth/login">
            <span className="cursor-pointer gap-2 text-emerald-400">
              Iniciar sessão
            </span>
          </Link>
        </span>
      </AuthContainer>
    </div>
  )
}

export default Register
