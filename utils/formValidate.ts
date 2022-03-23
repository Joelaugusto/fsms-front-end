import * as Yup from 'yup';
import { AnyObject } from 'yup/lib/types';


const passwordConfirm = (ref: string):Yup.StringSchema<string | undefined, AnyObject, string | undefined> => {
  return Yup.string()
    .required('Confirmação de senha é obrigatório')
    .oneOf([Yup.ref(ref), null], 'Senhas não conferem')
}

const genericField = (
  fieldName: string
): Yup.StringSchema<string | undefined, AnyObject, string | undefined> => {
  return Yup.string()
    .min(2, `${fieldName} deve ter pelo menos 2 caractéres`)
    .max(32, `${fieldName} deve ter no máximo 32 caractéres`)
    .required(`${fieldName} é obrigatório`)
}



const validate = {
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha deve ter pelo menos 6 caractéres')
    .max(20, 'Senha deve ter no máximo 20 caractéres')
    .required('Senha é obrigatória'),
  phone: Yup.string().required('Numero de celular é obrigatório'),
  passwordConfirm: passwordConfirm,
  name: Yup.string()
    .min(2, 'Nome deve ter pelo menos 2 caractéres')
    .max(32, 'Nome deve ter no máximo 32 caractéres')
    .required('Nome é obrigatório'),
  genericField: genericField
}

export default validate;
