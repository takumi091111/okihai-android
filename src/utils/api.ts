import axios, { AxiosError } from 'axios'
import { AsyncStorage } from 'react-native'
import { errorHandler } from '@/utils/errorHandlers'
import { Result } from '@/interfaces/Result'
import { User } from '@/interfaces/User'
import { Log } from '@/interfaces/Log'

const API_URL = 'https://414c4238.ap.ngrok.io/api'

const client = axios.create({ baseURL: API_URL })

client.interceptors.request.use(async (request) => {
  const token = await AsyncStorage.getItem('token')
  request.headers = {
    'Authorization': token ? `Bearer ${token}` : ''
  }
  return request
})

client.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(errorHandler(error))
)

interface LoginData {
  token: string
}

interface RegisterData {
  user: User,
  token: string
}

interface LockData {
  is_locked: boolean
}

interface PostErrorData {
  errors?: {
    [key: string]: string[]
  }
}

export const login = async (
  { email, password }: Pick<User, 'email' | 'password'>,
  noticeToken?: string
) => {
  const data = new FormData()

  data.append('email', email)
  data.append('password', password)
  if (noticeToken) {
    data.append('notice_token', noticeToken)
  }

  return client.post<LoginData>('/user/login', data)
    .then(response => {
      const { data, status } = response
      return {
        data,
        ok: true,
        statusCode: status
      }
    })
    .catch((error: AxiosError<null>) => {
      const { data, status } = error.response
      return {
        data,
        ok: false,
        statusCode: status
      }
    }) as Promise<Result<LoginData, null>>
}

export const logout = async () => {
  return client.get<null>('/user/logout')
    .then(response => {
      const { data, status } = response
      return {
        data,
        ok: true,
        statusCode: status
      }
    })
    .catch((error: AxiosError<null>) => {
      const { data, status } = error.response
      return {
        data,
        ok: false,
        statusCode: status
      }
    }) as Promise<Result<null, null>>
}

export const register = async (user: User) => {
  const {
    name,
    address,
    email,
    password,
    device_id
  } = user

  const data = new FormData()
  if (name) data.append('name', name)
  if (address) data.append('address', address)
  if (email) data.append('email', email)
  if (password) data.append('password', password)
  if (device_id) data.append('device_id', device_id)

  return client.post<RegisterData>('/user/register', data)
    .then(response => {
      const { data, status } = response
      return {
        data,
        ok: true,
        statusCode: status
      }
    })
    .catch((error: AxiosError<PostErrorData>) => {
      const { data, status } = error.response
      return {
        data,
        ok: false,
        statusCode: status,
        error: data?.errors
      }
    }) as Promise<Result<RegisterData, PostErrorData>>
}

export const toggleLock = async () => {
  return client.get<LockData>('/toggle')
    .then(response => {
      const { data, status } = response
      return {
        data,
        ok: true,
        statusCode: status
      }
    })
    .catch((error: AxiosError<null>) => {
      const { data, status } = error.response
      return {
        data,
        ok: false,
        statusCode: status
      }
  }) as Promise<Result<LockData, null>>
}

export const lockStatus = async () => {
  return client.get<LockData>('/device/status')
    .then(response => {
      const { data, status } = response
      return {
        data,
        ok: true,
        statusCode: status
      }
    })
    .catch((error: AxiosError<null>) => {
      const { data, status } = error.response
      return {
        data,
        ok: false,
        statusCode: status
      }
    }) as Promise<Result<LockData, null>>
}

export const loggedInUser = async () => {
  return client.get<User>('/user/logged_in')
    .then(response => {
      const { data, status } = response
      return {
        data,
        ok: true,
        statusCode: status
      }
    })
    .catch((error: AxiosError<null>) => {
      const { data, status } = error.response
      return {
        data,
        ok: false,
        statusCode: status
      }
    }) as Promise<Result<User, null>>
}

export const updateUser = async (user: Partial<Omit<User, 'device_id'>>) => {
  const {
    name,
    address,
    email,
    password
  } = user

  const data = new FormData()
  if (name) data.append('name', name)
  if (address) data.append('address', address)
  if (email) data.append('email', email)
  if (password) data.append('password', password)

  return client.post<User>('/user/update', data)
    .then(response => {
      const { data, status } = response
      return {
        data,
        ok: true,
        statusCode: status
      }
    })
    .catch((error: AxiosError<PostErrorData>) => {
      const { data, status } = error.response
      return {
        data,
        ok: false,
        statusCode: status,
        error: data.errors
      }
  }) as Promise<Result<User, PostErrorData>>
}

export const logList = async () => {
  return client.get<Log[]>('/log/list')
    .then(response => {
      const { data, status } = response
      return {
        data,
        ok: true,
        statusCode: status
      }
    })
    .catch((error: AxiosError<null>) => {
      const { data, status } = error.response
      return {
        data,
        ok: false,
        statusCode: status
      }
  }) as Promise<Result<Log[], null>>
}
