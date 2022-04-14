import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import AuthContainer from '../../../components/auth/container'
import Input from '../../../components/global/Input'
import { FiLogIn } from 'react-icons/fi'
import api from '../../../utils/api'
import Link from 'next/link'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import validate from '../../../utils/formValidate'

const Login: NextPage = (props: any) => {


  const router = useRouter()

  const resetPassword = async (form: {email: string}, setSubmitting: Function) => {

    const { email } = form;
      await api
        .post(`password-reset`, {
          email,
        })
        .then((data: any) => {
          router.push({pathname: '/'})
        })
        setSubmitting(false)
  }

  return (
    <AuthContainer title="Tela de Recuperação de senha">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: validate.email,
        })}
        onSubmit={(values, { setSubmitting }) => {
          resetPassword(values, setSubmitting)
        }}
      >
        <Form noValidate>
          <Input
            label="Email ou celular"
            type="email"
            name="email"
            placeholder="Digite seu email ou celular"
          />
          
          <Input type="submit" value="Iniciar Sessão" icon={<FiLogIn />} />
        </Form>
      </Formik>
      <span className="text-center">
        Não tem conta ainda?
        <Link href="/auth/register">
          <span className="cursor-pointer gap-2 text-emerald-400">
            Criar conta
          </span>
        </Link>
      </span>
    </AuthContainer>
  )
}

export default Login
