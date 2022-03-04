import type {NextPage} from 'next'
import {useEffect, useState} from 'react';

//icons
import {FcGoogle} from "react-icons/fc";
import {FiUserPlus} from "react-icons/fi";

//components
import AuthContainer from '../../components/auth/container';
import Input from '../../components/global/Input';
import Options from '../../components/auth/options';
import Separator from '../../components/auth/separator';
import Stepper from '../../components/auth/stepper';


import dynamic from 'next/dynamic'
import Head from 'next/head';
import Link from 'next/link';

import axios from 'axios';

const Map = dynamic(
    () => import('../../components/map'),
    {ssr: false}
)


const Login: NextPage = () => {


    const provinces = ['Maputo', 'Gaza', 'Inhambane', 'Manica', 'Sofala', 'Tete', 'Zambézia', 'Nampula', 'Niassa', 'Cabo Delgado'];
    const roles = ['Agricultor', 'Estoquicista', 'Varejista', 'Distribuidor'];

    const [emailValidatedMessage, setEmailValidatedMessage] = useState('');
    const [phoneValidatedMessage, setPhoneValidatedMessage] = useState('');

    const [showMap, setShowMap] = useState(false);
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('')
    const [province, setProvince] = useState(provinces[0]);
    const [district, setDistrict] = useState('');
    const [locality, setLocality] = useState('');
    const [step, setStep] = useState(0);

    let validated = false;

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        });
    }, [])


    const steps = [
      <>
        <Input
          type="text"
          placeholder="Nome Complecto"
          label="Nome"
          onChange={(e: any) => {
            setName(e.target.value)
          }}
        />
        <div>
          <Input
            type="text"
            placeholder="Email"
            invalid={emailValidatedMessage}
            label="Senha"
            onChange={(e: any) => {
              setEmail(e.target.value)
            }}
          />
          <small className="text-red-500">{emailValidatedMessage}</small>
        </div>
        <div>
          <Input
            type="text"
            placeholder="Contacto"
            invalid={phoneValidatedMessage}
            label="Contacto"
            onChange={(e: any) => {
              setPhone(e.target.value)
            }}
          />
          <small className="text-red-500">{phoneValidatedMessage}</small>
        </div>
      </>,
      <>
        <Input
          type="select"
          placeholder="Selecione a sua funcão"
          label="Funcão"
          options={roles}
          onChange={(e: any) => {
            setRole(e.target.value)
          }}
        />
        <Input
          type="password"
          placeholder="Senha"
          label="Senha"
          onChange={(e: any) => {
            setPassword(e.target.value)
          }}
        />
        <Input
          type="password"
          placeholder="Confirmar Senha"
          label="Confirmar Senha"
          onChange={(e: any) => {
            setConfirmPassword(e.target.value)
          }}
        />
      </>,
      <>
        <Input
          type="select"
          placeholder="Selecione a província"
          label="Província"
          options={provinces}
          onChange={(e: any) => {
            setProvince(e.target.value)
          }}
        />
        <Input
          type="text"
          placeholder="Distrito"
          label="Distrito"
          onChange={(e: any) => {
            setDistrict(e.target.value)
          }}
        />
        <Input
          type="text"
          placeholder="Localidade"
          label="Localidade"
          onChange={(e: any) => {
            setLocality(e.target.value)
          }}
        />
        <Options
          options={['Coordenadas', 'Mapa']}
          select={(index: Number) => {
            setShowMap(index === 1 ? true : false)
          }}
        ></Options>
        <div
          className="flex gap-5 flex-col"
          style={showMap ? { display: 'none' } : undefined}
        >
          <Input
            type="number"
            placeholder="Latitude"
            label="Latitude"
            value={latitude}
            onChange={(e: any) => {
              setLatitude(e.target.value)
            }}
          />
          <Input
            type="number"
            placeholder="Longitude"
            label="Longitude"
            value={longitude}
            onChange={(e: any) => {
              setLongitude(e.target.value)
            }}
          />
        </div>
        <div
          className="grid place-items-center"
          style={!showMap ? { display: 'none' } : undefined}
        >
          <Map
            latitude={latitude}
            longitude={longitude}
            popup={'Voce está aqui!'}
          />
        </div>
      </>,
    ]

    const validate = async () => {
        axios.get(`http://localhost:8080/api/v1/users/unique?email=${email}&phone=${phone}`).then(e => {
            const email: string = e.data.email;
            const phone: string = e.data.phone;

            validated = !phone && !email;

            if (email) {
                setEmailValidatedMessage('Este email já é usado!')
            }
            if (phone) {
                setPhoneValidatedMessage('Este numero já é usado!')
            }
        }).catch(() => false)
    }

    const submitForm = async (e: any) =>
    {
        e.preventDefault();
        await axios.post('http://localhost:8080/api/v1/users', {
            name,
            email,
            phone,
            password,
            confirmPassword,
            role: 'ADMIN',
            address: {
                province: 'SOFALA',
                district,
                locality,
                latitude,
                longitude
            }
        })

    }

    const changeStep = async (e: any) => {
        await validate()
        if (steps.length - 1 <= step) {
            submitForm(e)
        } else {
            setStep(step + 1)
        }
    }

    const onchangeStep = async (e: any) => {
        await validate();
        setStep(e)
    }

    return (
      <div>
        <Head>
          <title>Create New Account</title>
          <meta name="Register" content="Register Form" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AuthContainer>
          <div className="grid place-content-center">
            <button className="flex h-12 justify-center gap-2.5 rounded-md border border-solid border-zinc-700 bg-white p-2.5">
              <FcGoogle size={24} />
              <span>Login com conta Google</span>
            </button>
            <div className="grid place-content-center gap-5">
              <Separator>ou inserir registro</Separator>
              {steps[step]}
              <Stepper
                total={steps.length}
                current={step}
                setStep={onchangeStep}
              />
              <Input
                type="submit"
                icon={steps.length - 1 <= step ? <FiUserPlus /> : null}
                value={steps.length - 1 <= step ? 'Registrar' : 'Proximo Passo'}
                onClick={changeStep}
              />
              <span className="text-center my-5 text-gray-500">
                Ja tem conta?<Link href="/auth/login"> Login</Link>
              </span>
            </div>
          </div>
        </AuthContainer>
      </div>
    )
}


export default Login; 