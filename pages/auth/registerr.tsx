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
        <AuthContainer title="Concluir Registro">
          <form className='grid'>
            
            
          </form>
        </AuthContainer>
      </div>
    )
}


export default Login; 