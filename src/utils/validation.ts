import * as yup from 'yup'
import { VALIDATION_ERROR } from '@/utils/errors'

const userSchema = {
  name: yup.string()
    .max(255, VALIDATION_ERROR.NAME_TOO_LONG)
    .required(VALIDATION_ERROR.REQUIRED),
  address: yup.string()
    .max(255, VALIDATION_ERROR.ADDRESS_TOO_LONG)
    .required(VALIDATION_ERROR.REQUIRED),
  email: yup.string()
    .email(VALIDATION_ERROR.EMAIL_INVALID)
    .required(VALIDATION_ERROR.REQUIRED),
  password: yup.string()
    .min(6, VALIDATION_ERROR.PASSWORD_TOO_SHORT)
    .max(255, VALIDATION_ERROR.PASSWORD_TOO_LONG)
    .required(VALIDATION_ERROR.REQUIRED),
  device_id: yup.string()
    .matches(/^\d{4}-\d{4}-\d{4}-\d{4}$/, VALIDATION_ERROR.DEVICE_ID_INVALID)
    .required(VALIDATION_ERROR.REQUIRED)
}

export const profileEditSchema = yup.object().shape({
  name: userSchema.name,
  address: userSchema.address,
  email: userSchema.email,
  password: userSchema.password
})

export const registerSchema = yup.object().shape({
  ...userSchema
})

export const loginSchema = yup.object().shape({
  email: userSchema.email,
  password: yup.string()
    .required(VALIDATION_ERROR.REQUIRED)
})
