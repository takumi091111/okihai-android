import {
  LoginRequest,
  RegisterRequest,
  UpdateRequest
} from '@/interfaces/Request'
import {
  ErrorResponse,
  LoggedInResponse,
  LoginResponse,
  RegisterResponse,
  UpdateResponse
} from '@/interfaces/Response'
import { User } from '@/interfaces/User'
import { createClient, request } from '@/utils/api/client'

const BASE_PATH = 'user'
const client = createClient(BASE_PATH)

export const login = async ({
  email,
  password,
  noticeToken
}: LoginRequest<User>) => {
  const data = new FormData()
  data.append('email', email)
  data.append('password', password)
  if (noticeToken) {
    data.append('notice_token', noticeToken)
  }

  return request<LoginResponse, null>(client, {
    data,
    url: '/login',
    method: 'POST'
  })
}

export const logout = async () => {
  return request<null, null>(client, {
    url: '/logout',
    method: 'GET'
  })
}

export const loggedIn = async () => {
  return request<LoggedInResponse<User>, null>(client, {
    url: '/logged_in',
    method: 'GET'
  })
}

export const register = async ({
  name,
  address,
  email,
  password,
  device_id,
  noticeToken
}: RegisterRequest<User & { noticeToken?: string }>) => {
  const data = new FormData()
  if (name) data.append('name', name)
  if (address) data.append('address', address)
  if (email) data.append('email', email)
  if (password) data.append('password', password)
  if (device_id) data.append('device_id', device_id)
  if (noticeToken) {
    data.append('notice_token', noticeToken)
  }

  return request<RegisterResponse<User>, ErrorResponse>(client, {
    data,
    url: '/register',
    method: 'POST'
  })
}

export const update = async ({
  name,
  address,
  email,
  password
}: UpdateRequest<User>) => {
  const data = new FormData()
  if (name) data.append('name', name)
  if (address) data.append('address', address)
  if (email) data.append('email', email)
  if (password) data.append('password', password)

  return request<UpdateResponse<User>, ErrorResponse>(client, {
    data,
    url: '/update',
    method: 'POST'
  })
}
