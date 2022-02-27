import type { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import AuthContainer from '../../../components/auth/container'
import Input from '../../../components/global/Input'
import { FiLogIn } from 'react-icons/fi'
import api from '../../../utils/api'
import validate from '../../../utils/formValidate'
import Link from 'next/link'

const Login: NextPage = (props: any) => {
  const [email, setEmail] = useState('')

  const [isEmailValidated, setIsEmailValidated] = useState(false)

  const router = useRouter()

  const resetPassword = async (e: MouseEvent|TouchEvent) => {
    e.preventDefault()

    if(isEmailValidated){
      await api
        .post(`http://localhost:8080/api/v1/password-reset`, {
          email,
        })
        .then((data: any) => {
          console.log(data)
          router.push({pathname: '/'})
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <AuthContainer title="Tela de Recuperação de senha">
      <Input
        type="email"
        placeholder="Email ou número de celular"
        label="Email ou número de celular"
        error="Introduza um email válido!"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        onChangeCapture={() => {
          setIsEmailValidated(validate.emailValidate(email))
        }}
        validated={isEmailValidated}
      />
      <Input
        type="submit"
        value="Entrar"
        onClick={resetPassword}
        icon={<FiLogIn size={20} />}
      />
      <span className="text-center">
        Não tem conta ainda?
        <Link href="/auth/register">
          <span className="cursor-pointer text-emerald-400 gap-2">Criar conta</span>
        </Link>
      </span>
    </AuthContainer>
  )
}

export default Login
