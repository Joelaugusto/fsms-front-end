import * as Yup from 'yup';
import { AnyObject } from 'yup/lib/types';


const passwordConfirm = (ref: string):Yup.StringSchema<string | undefined, AnyObject, string | undefined> => {
  return Yup.string()
    .required('Confirmação de senha é obrigatório')
    .oneOf([Yup.ref(ref), null], 'Senhas não conferem')
}

const validate = {
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha deve ter pelo menos 6 caractéres')
    .max(20, 'Senha deve ter no máximo 20 caractéres')
    .required('Senha é obrigatória'),
  phone: Yup.string().required('Numero de celular é obrigatório'),
  passwordConfirm: passwordConfirm,
}

export default validate;
