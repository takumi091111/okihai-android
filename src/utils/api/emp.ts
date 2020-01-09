import { Employee } from '@/interfaces/Employee'
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
  SearchResponse,
  UpdateResponse
} from '@/interfaces/Response'
import { createClient, request } from '@/utils/api/client'

const BASE_PATH = 'employee'
const client = createClient(BASE_PATH)

export const login = async ({ email, password }: LoginRequest<Employee>) => {
  const data = new FormData()
  data.append('email', email)
  data.append('password', password)

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
  return request<LoggedInResponse<Employee>, null>(client, {
    url: '/logged_in',
    method: 'GET'
  })
}

export const register = async ({
  name,
  email,
  password,
  is_admin
}: RegisterRequest<Employee>) => {
  const data = new FormData()
  if (name) data.append('name', name)
  if (email) data.append('email', email)
  if (password) data.append('password', password)
  if (is_admin) data.append('is_admin', String(is_admin))

  return request<RegisterResponse<Employee>, ErrorResponse>(client, {
    data,
    url: '/register',
    method: 'POST'
  })
}

export const update = async (
  id: number,
  { name, email, password, is_admin }: UpdateRequest<Employee>
) => {
  const data = new FormData()
  // nameは必須
  data.append('name', name)
  if (email) data.append('email', email)
  if (password) data.append('password', password)
  if (is_admin) data.append('is_admin', String(is_admin))

  return request<UpdateResponse<Employee>, ErrorResponse>(client, {
    data,
    url: `/${id}/update`,
    method: 'POST'
  })
}

export const search = async (query: string) => {
  const params = { q: query }

  return request<SearchResponse, null>(client, {
    params,
    url: '/list',
    method: 'GET'
  })
}
