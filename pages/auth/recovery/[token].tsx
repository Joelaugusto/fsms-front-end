import type { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import AuthContainer from '../../../components/auth/container'
import Input from '../../../components/global/Input'
import { BiReset } from 'react-icons/bi'
import api from '../../../utils/api'
import validate from '../../../utils/formValidate'
import Link from 'next/link'


const Recovery: NextPage = (props: any) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState()

  const [isEmailValidated, setIsEmailValidated] = useState(false)
  const [isPasswordValidated, setIsPasswordValidated] = useState(false)

  const router = useRouter()
  const { token } = router.query

  const resetPassword = async (e: any) => {
    e.preventDefault()

    await api
      .post(`http://localhost:8080/api/v1/password-reset/${token}`, {
        password,
        email,
      })
      .then(() => {
        router.push('/')
      })
      .catch((error) => {})
  }

  return (
    <AuthContainer title="Tela de Recuperação da Conta!">
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
        type="password"
        placeholder="Nova senha"
        label="Nova senha"
        error="Introduza pelo menos 8 caracteres, uma letra e um digito!"
        onChange={(e: any) => setPassword(e.target.value)}
        value={password}
        validated={isPasswordValidated}
        onChangeCapture={() => {
          setIsPasswordValidated(validate.validatePassword(password))
        }}
      />
      <Input
        type="password"
        placeholder="Confirmar senha"
        label="Confirmar senha"
        error="As senhas não coincidem!"
        onChange={(e: any) => setPasswordConfirm(e.target.value)}
        value={passwordConfirm}
        validated={password === passwordConfirm}
      />
      <Input
        type="submit"
        value="Resetar Senha"
        onClick={resetPassword}
        icon={<BiReset size={20} />}
      />
      <span className="text-center">
        Voltar a tela de{' '}
        <Link href="/auth/login">
          <span className="text-emerald-400 cursor-pointer">Login</span>
        </Link>
      </span>
    </AuthContainer>
  )
}

export default Recovery
