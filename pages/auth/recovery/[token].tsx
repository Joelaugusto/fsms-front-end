import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import AuthContainer from '../../../components/auth/container'
import Input from '../../../components/global/Input'
import { BiReset } from 'react-icons/bi'
import api from '../../../utils/api'
import validate from '../../../utils/formValidate'
import Link from 'next/link'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'


const Recovery: NextPage = (props: any) => {


  const router = useRouter()
  const { token } = router.query

  const resetPassword = async (form: {email: string, password: string}, setSubmitting: Function) => {
    

    const { email, password } = form

    await api
      .post(`http://localhost:8080/api/v1/password-reset/${token}`, {
        password,
        email,
      })
      .then((data) => {
        router.push({pathname: '/auth/login'})
      })
      
  }

  return (
    <AuthContainer title="Tela de Recuperação da Conta!">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: validate.email,
          password: validate.password,
          passwordConfirm: validate.passwordConfirm('password'),
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
          <Input
            label="Senha"
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            label="Cornfirmar senha"
            type="password"
            name="passwordConfirm"
            placeholder="Confirme sua senha"
          />
          <Input type="submit" value="Iniciar Sessão" icon={<BiReset />} />
        </Form>
      </Formik>
      <span className="text-center">
        Voltar a tela de{' '}
        <Link href="/auth/login">
          <span className="cursor-pointer text-emerald-400">Login</span>
        </Link>
      </span>
    </AuthContainer>
  )
}

export default Recovery
