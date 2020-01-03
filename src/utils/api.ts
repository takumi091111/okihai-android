import axios, { AxiosError } from 'axios'
import { AsyncStorage } from 'react-native'
import { errorHandler } from '@/utils/errorHandlers'
import { Result } from '@/interfaces/Result'
import { User } from '@/interfaces/User'
import { Log } from '@/interfaces/Log'
import { LoginData, RegisterData, LockData, ErrorData } from '@/interfaces/Data'

const API_URL = 'http://bd1498ff.ap.ngrok.io/api'

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

  const response = await client.post<LoginData>('/user/login', data)
    .catch((error: AxiosError<null>) => error.response)
  
  return {
    data: response.data,
    ok: response.status === 200,
    statusCode: response.status
  } as Result<LoginData, null>
}

export const logout = async () => {
  const response = await client.get<null>('/user/logout')
    .catch((error: AxiosError<null>) => error.response)
  
  return {
    data: response.data,
    ok: response.status === 200,
    statusCode: response.status
  } as Result<null, null>
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

  const response = await client.post<RegisterData>('/user/register', data)
    .catch((error: AxiosError<ErrorData>) => error.response)
  
  return {
    data: response.data,
    ok: response.status === 200,
    statusCode: response.status
  } as Result<RegisterData, ErrorData>
}

export const toggleLock = async () => {
  const response = await client.get<LockData>('/device/toggle')
    .catch((error: AxiosError<null>) => error.response)
  
  return {
    data: response.data,
    ok: response.status === 200,
    statusCode: response.status
  } as Result<LockData, null>
}

export const lockStatus = async () => {
  const response = await client.get<LockData>('/device/status')
    .catch((error: AxiosError<null>) => error.response)
  
  return {
    data: response.data,
    ok: response.status === 200,
    statusCode: response.status
  } as Result<LockData, null>
}

export const loggedInUser = async () => {
  const response = await client.get<User>('/user/logged_in')
    .catch((error: AxiosError<null>) => error.response)
  
  return {
    data: response.data,
    ok: response.status === 200,
    statusCode: response.status
  } as Result<User, null>
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

  const response = await client.post<User>('/user/update', data)
    .catch((error: AxiosError<ErrorData>) => error.response)
  
  return {
    data: response.data,
    ok: response.status === 200,
    statusCode: response.status
  } as Result<User, ErrorData>
}

export const logList = async () => {
  const response = await client.get<Log[]>('/log/list')
    .catch((error: AxiosError<null>) => error.response)
  
  return {
    data: response.data,
    ok: response.status === 200,
    statusCode: response.status
  } as Result<Log[], null>
}
