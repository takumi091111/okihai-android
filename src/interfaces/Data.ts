import { User } from '@/interfaces/User'

export interface LoginData {
  token: string
}

export interface RegisterData {
  user: User
  token: string
}

export interface LockData {
  is_locked: boolean
}

type ErrorMessage = {
  [key: string]: string | string[]
}

export type ErrorMessageString = {
  [key: string]: string
}

export interface ErrorData {
  errors?: ErrorMessage
}
