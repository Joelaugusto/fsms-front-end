
function validatePassword(p:string) {

  let  errors = []
  if (p.length < 8) {
    errors.push('Your password must be at least 8 characters')
  }
  if (p.search(/[a-z]/i) < 0) {
    errors.push('Your password must contain at least one letter.')
  }
  if (p.search(/[0-9]/) < 0) {
    errors.push('Your password must contain at least one digit.')
  }
  if (errors.length > 0) {
    return false
  }
  return true
}

function validatePasswordMsg(p: string) {
  let errors = []
  if (p.length < 8) {
    errors.push('Your password must be at least 8 characters')
  }
  if (p.search(/[a-z]/i) < 0) {
    errors.push('Your password must contain at least one letter.')
  }
  if (p.search(/[0-9]/) < 0) {
    errors.push('Your password must contain at least one digit.')
  }
  if (errors.length > 0) {
    return errors.join('\n')
  }
  return ""
}

const passwordValidate = (value: string):boolean => {
  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  return regex.test(value)
}

const emailValidate = (value: string):boolean => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(value)
}


const validate =  {passwordValidate, emailValidate, validatePassword,validatePasswordMsg}
export default validate;
