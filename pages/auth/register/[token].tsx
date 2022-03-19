import type {NextPage} from 'next'
import {useEffect, useState} from 'react';

//icons
import {FiUserPlus} from "react-icons/fi";

//components
import AuthContainer from '../../../components/auth/container';
import Input from '../../../components/global/Input';
import Options from '../../../components/auth/options';
import Stepper from '../../../components/auth/stepper';
import dynamic from 'next/dynamic'
import Head from 'next/head';
import Link from 'next/link';
import api from '../../../utils/api';
import type { GetServerSidePropsContext } from 'next'


const Map = dynamic(
    () => import('../../../components/map'),
    {ssr: false}
)


const Login: NextPage = (props:any) => {


    const provinces = ['Maputo', 'Gaza', 'Inhambane', 'Manica', 'Sofala', 'Tete', 'Zambézia', 'Nampula', 'Niassa', 'Cabo Delgado'];
    const roles = ['Agricultor', 'Estoquicista', 'Varejista', 'Distribuidor'];


    const [showMap, setShowMap] = useState(false);
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [name, setName] = useState('');
    const [role, setRole] = useState('')
    const [province, setProvince] = useState(provinces[0]);
    const [district, setDistrict] = useState('');
    const [locality, setLocality] = useState('');
    const [step, setStep] = useState(0);

    let validated = false;




    const steps = [
      <>
        <Input
          type="text"
          placeholder="Nome Complecto"
          label="Nome Completo"
          onChange={(e: any) => {
            setName(e.target.value)
          }}
        />
        <Input
          type="select"
          placeholder="Selecione a sua funcão"
          label="Funcão"
          options={roles}
          onChange={(e: any) => {
            setRole(e.target.value)
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
          className="grid gap-5 md:grid-cols-2"
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
        <Input />
      </>,
    ]


    const submitForm = async (e: any) =>
    {
        e.preventDefault();
        await api.post('users', {
            name,
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
      e.preventDefault()
        //await validate()
        if (steps.length - 1 <= step) {
            submitForm(e)
        } else {
            setStep(step + 1)
        }
    }

    const onchangeStep = async (e: any) => {
       // await validate();
        setStep(e)
    }

    return (
      <div>
        <Head>
          <title>Create New Account</title>
          <meta name="Register" content="Register Form" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AuthContainer title="Concluir Registro">
          <form className="grid place-content-center">
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
              <span className="my-5 text-center text-gray-500">
                Ja tem conta?<Link href="/auth/login"> Login</Link>
              </span>
          </form>
        </AuthContainer>
      </div>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {


  await api.post(`users/verify-email/${context.params?.token}`)
    .then((data) => {
      return {
        props: { userId: data.data?.id },
      }
    })

  return {props: {}}
}



export default Login; 

