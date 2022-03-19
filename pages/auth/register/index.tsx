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
import { setInterval } from 'timers/promises'

const Register: NextPage = () => {


  const router = useRouter()

  const [emailValidatedMessage, setEmailValidatedMessage] = useState('')
  const [phoneValidatedMessage, setPhoneValidatedMessage] = useState('')


  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
 

  let validated = false



  const sendEmail = async (e:any) => {
    e.preventDefault();

    if(password !== confirmPassword){
      toast.error('As senhas não conscidem !')
      return;
    }

    await api.get(`users/unique?email=${email}&phone=${phone}`)
      .then((e) => {
        const email: string = e.data.email
        const phone: string = e.data.phone

        validated = !phone && !email

        if (email) {
          setEmailValidatedMessage('Este email já é usado!')
        }
        if (phone) {
          setPhoneValidatedMessage('Este numero já é usado!')
        }
        if(email || phone){
          return;
        }
      });


      const response = await toast.promise(
        api.post(`users/verify-email`, { email, phone, password }).then(() => {
          setTimeout(() => {router.push('/auth/login')}, 5000)
        }),
        {
          pending: 'Efectuando o registro',
          success:
            'Uma messagem com instruições de conclusão de registro foi enviada para o seu email! 👌',
          error: 'Falha ao efectuar registro! 🤯',
        }
      )

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
        <form className="grid" onSubmit={sendEmail}>
          <div className="grid gap-4 md:grid-cols-2">
          <Input
            type="email"
            placeholder="Introduza o seu email"
            label="Email"
            error="Introduza um email válido!"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            invalid={false}
          />
          <Input
            type="text"
            placeholder="Introduza o seu número de celular"
            label="Número de celular"
            error="Introduza número de válido!"
            value={phone}
            invalid={false}
            onChange={(e: any) => setPhone(e.target.value)}
          />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              type="password"
              placeholder="Introduza a senha"
              label="Senha"
              error="Senha Inválida!"
              onChange={(e: any) => setPassword(e.target.value)}
              value={password}
              invalid={false}
            />
            <Input
              type="password"
              placeholder="Confirmar senha"
              label="Confirmar Senha"
              error="Senha Inválida!"
              onChange={(e: any) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              invalid={false}
            />
          </div>
          <Input type="submit" value="Entrar" icon={<FiLogIn size={20} />} />
          <span className="text-center">
            Já tem conta?
            <Link href="/auth/login">
              <span className="cursor-pointer gap-2 text-emerald-400">
                Iniciar sessão
              </span>
            </Link>
          </span>
        </form>
      </AuthContainer>
    </div>
  )
}

export default Register
