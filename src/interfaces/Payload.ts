import { State } from '@/interfaces/State'

export interface Error {
  errorMessage?: string
}

export interface Errors {
  errors: {
    [key: string]: string[]
  }
}

export interface Result<T> {
  success: boolean
  data?: T
  statusCode?: number
}

export interface ApiPayload {
  data: any
  statusCode: number
}

export interface ActionPayload {
  state: any | null,
  errors: {
    [key: string]: string[]
  }
}
