import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import AuthContainer from '../../components/auth/container'
import Input from '../../components/global/Input'
import { FcGoogle } from 'react-icons/fc'
import { FiLogIn } from 'react-icons/fi'
import api from '../../utils/api'
import * as Yup from 'yup'
import Link from 'next/link'
import cookies from '../../utils/cookies'
import Separator from '../../components/auth/separator'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import { Formik } from 'formik'

const Login: NextPage = (props: any) => {

  const router = useRouter()


  const resetPassword = async (form: {email:string, password:string}, setSubmitting: Function) => {
      

      setSubmitting(true)
      try{
      await toast.promise(
        api
          .post(`auth`, form)
          .then((data: any) => {
            cookies.setAccessToken(data.data.accessToken, data.data.tokenTtl)
            router.push({ pathname: '/' })
          }),
          {
          pending: 'Iniciando Sessão!',
          success: 'Sessão iniciada com sucesso! 👌',
          error: 'Erro ao iniciar sessão! 🤯',
        }
      )
      }catch(e){
        setSubmitting(false)
      }
      setSubmitting(false)
    }

  return (
    <AuthContainer title="Tela de Login!">
      <ToastContainer />
      <button className="flex h-12 justify-center gap-2.5 rounded-md border border-solid border-zinc-700 bg-white p-2.5">
        <FcGoogle size={24} />
        <span>Login com conta Google</span>
      </button>
      <Separator>OU</Separator>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Email inválido').required('Email é obrigatório')
          .required('Email é obrigatório'),
          password: Yup.string().min(6,'Senha deve ter pelo menos 6 caractéres')
          .max(20,'Senha deve ter no máximo 20 caractéres').required('Senha é obrigatória'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          resetPassword(values, setSubmitting)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Input
              label="Email ou celular"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email && touched.email && errors.email}
            />
            <Input
              label="Senha"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={errors.password && touched.password && errors.password}
            />
            <Input type="submit" disabled={isSubmitting} value='Iniciar Sessão'/>
          </form>
        )}
      </Formik>
      <span className="text-center">
        Não tem conta ainda?
        <Link href="/auth/register">
          <span className="cursor-pointer gap-2 text-emerald-400">
            Criar conta
          </span>
        </Link>
      </span>
      <span className="text-center">
        Esqueceu a senha?
        <Link href="/auth/recovery/reset">
          <span className="cursor-pointer gap-2 text-emerald-400">
            Recuperar senha
          </span>
        </Link>
      </span>
    </AuthContainer>
  )
}

export default Login
