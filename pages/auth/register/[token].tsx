import type {NextPage} from 'next'
import {useEffect, useState} from 'react';

//icons
import {FiUserPlus} from "react-icons/fi";

//components
import AuthContainer from '../../../components/auth/container';
import Input from '../../../components/global/Input';
import Options from '../../../components/auth/options';
import Stepper from '../../../components/auth/stepper';
import Head from 'next/head';
import Link from 'next/link';
import api from '../../../utils/api';
import type { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify'
import cookies from '../../../utils/cookies'
import { Formik, Form } from 'formik';
import validate from '../../../utils/formValidate';
import * as Yup from 'yup'
import MapBox from '../../../components/map/mapBox';

const Login: NextPage = (props: any) => {
  

  const access_key = process.env.NEXT_PUBLIC_POSITION_STACK_ACCESS_KEY;

  const router = useRouter();
    
    const provinces = ['Maputo', 'Gaza', 'Inhambane', 'Manica', 'Sofala', 'Tete', 'Zambézia', 'Nampula', 'Niassa', 'Cabo Delgado'];
    const backProvinces = ['MAPUTO', 'GAZA', 'INHAMBANE', 'MANICA', 'SOFALA','TETE', 'ZAMBEZIA', 'NAMPULA','NIASSA','CABO_DELGADO']
    

    const [showMap, setShowMap] = useState<boolean>(true);
    const [latitude, setLatitude] = useState<number>(0)
    const [longitude, setLongitude] = useState<number>(0)
    const [address, setAddress] = useState<Array<any>>([])
    const [step, setStep] = useState(0);
  
    const [name, setName] = useState('')
    const [role, setRole] = useState(props.roles[0])
  


    const stepValidations: Array<any> = [
      {
        name: validate.name,
      },
      {
        district: validate.genericField('Distrito'),
        locality: validate.genericField('Localidade'),
      },
    ]
  
  const findAddress = async () => {

      fetch(
        `http://api.positionstack.com/v1/reverse?access_key=${access_key}&query=${latitude},${longitude}`
      )
        .then((response) => response.json())
        .then((data) => setAddress(data.data))
    }
  
    useEffect(() => {
      const getGeolocation = async () => {
        await navigator.geolocation.getCurrentPosition(async (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        })
      }
      getGeolocation()
    }, [])
  
    useEffect(() => {
      if (latitude && longitude) {
        findAddress();
      } 
    }, [latitude, longitude])

    const steps = [
      <>
        <Input
          type="text"
          placeholder="Nome Complecto"
          label="Nome Completo"
          name="name"
          key="name"
        />
        <Input
          type="select"
          placeholder="Selecione a sua funcão"
          label="Funcão"
          options={props.roles.map((role: any) => role.name)}
          name="role"
          key="role"
        />
      </>,
      <>
        <Options
          options={['Coordenadas', 'Mapa']}
          select={(index: Number) => {
            setShowMap(index === 1 ? true : false)
          }}
        ></Options>
        <div style={showMap ? { display: 'none' } : undefined}>
          <Input
            type="select"
            placeholder="Selecione a província"
            label="Província"
            options={provinces}
            name="province"
            key="province"
          />
          <Input
            type="text"
            placeholder="Distrito"
            label="Distrito"
            name="district"
            key="district"
          />
          <Input
            type="text"
            placeholder="Bairro/Localidade"
            label="Localidade"
            name="locality"
            key="locality"
          />
          <div className="grid gap-5 md:grid-cols-2">
            <Input
              type="number"
              placeholder="Latitude"
              label="Latitude"
              name="latitude"
              key="latitude"
            />
            <Input
              type="number"
              placeholder="Longitude"
              label="Longitude"
              name="longitude"
              key="longitude"
            />
          </div>
        </div>
        <div style={!showMap ? { display: 'none' } : undefined}>
          <MapBox
            latitude={latitude}
            longitude={longitude}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
        </div>
        <Input />
      </>,
    ]


    const submitForm = async (
      form: { province: string, name: string, district: string, locality:string,
         latitude: string, longitude:string, role:number },
      setSubmitting: Function
    ) => {

      

      setSubmitting(true)

      await toast.promise(
        api
          .post(`users/${props.userId}`, {
            name: form.name,
            role: role,
            address: {
              province:
                backProvinces[provinces.findIndex((n: string) => n === form.province)],
              district: form.district,
              locality: form.locality,
              latitude: form.latitude ? form.latitude : latitude,
              longitude: form.longitude ? form.longitude: longitude,
            },
          })
          .then((data: any) => {
            document.cookie = ''
            cookies.setAccessToken(data.data.accessToken, data.data.tokenTtl)
            router.push({ pathname: '/' })
          }),
        {
          pending: 'Concluindo Registro!',
          success: 'Registro concluído com sucesso! 👌',
          error: 'Erro ao concluir o registro! 🤯',
        }
      )

    }

  const changeStep = async (e: any, setSubmitting: Function) => {
    console.log(e)
        if (steps.length - 1 <= step) {
            submitForm(e, setSubmitting)
        } else {
          setName(e.name)
          setRole(props.roles.filter((rol:any) => rol.name === e.role)[0].id)
            setStep(step + 1)
        }
    console.log(e)
    }

    const onchangeStep = async (e: any) => {
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
          <Formik
            enableReinitialize={true}
            initialValues={{
              name: name,
              role: role.name,
              province: address[0]?.region,
              district: address[0]?.county,
              locality: address[0]?.name,
              latitude: latitude,
              longitude: longitude,
            }}
            validationSchema={Yup.object({
              ...stepValidations[step],
            })}
            onSubmit={(values, { setSubmitting }) => {
              changeStep(values, setSubmitting)
            }}
          >
            <Form className="grid">
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
              />
            </Form>
          </Formik>
          <span className="my-5 text-center text-gray-500">
            Ja tem conta?<Link href="/auth/login"> Login</Link>
          </span>
        </AuthContainer>
      </div>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {

  let user: any
  let roles: any
  
  await api.post(`users/verify-email/${context.params?.token}`).then((data) => {
    user = data.data;
  })

  await api.get('users/roles').then((data) => { 
    roles = data.data;
  })

  if(user){
    return {
      props: {
        userId: user.id,
        roles: roles
      }
    }
  }else{
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }
}

export default Login; 

