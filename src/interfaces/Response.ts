import { Employee } from '@/interfaces/Employee'
import { Log } from '@/interfaces/Log'
import { User } from '@/interfaces/User'

export interface LoginResponse {
  token: string
}

export type LoggedInResponse<T> = T

export type RegisterResponse<T> = T extends User
  ? {
      user: User
      token: string
    }
  : T

export type UpdateResponse<T> = T

export interface LockResponse {
  is_locked: boolean
}

export type LogListResponse = Log[]

export type SearchResponse = Employee[]

type ErrorMessage = {
  [key: string]: string | string[]
}

export type ErrorMessageString = {
  [key: string]: string
}

export interface ErrorResponse {
  errors?: ErrorMessage
}
