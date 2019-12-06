import { State } from '@/interfaces/State'

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
