import axios from 'axios'
import { ApiPayload } from '@/interfaces/Payload'

const API_URL = 'https://e435f43c.ngrok.io/api'

const createApiClient = (token: string = '') => {
  if (token === null || token === '') {
    return axios.create({
      baseURL: API_URL
    })
  }
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const login = async (email: string, password: string, noticeToken?: string): Promise<ApiPayload> => {
  console.log({
    email,
    password
  })

  const data = new FormData()
  data.append('email', email)
  data.append('password', password)
  if (noticeToken) {
    data.append('notice_token', noticeToken)
  }

  const client = createApiClient()

  try {
    const response = await client.post('/user/login', data)
    return {
      data: response.data,
      statusCode: response.status
    }
  } catch(e) {
    console.log('login error', e)
    const response = e.response
    return {
      data: response.data || null,
      statusCode: response.status
    }
  }
}

export const logout = async (token: string) => {
  const client = createApiClient(token)
  
  try {
    const response = await client.get('/user/logout')
    return {
      data: response.data,
      statusCode: response.status
    }
  } catch(e) {
    console.log('logout error', e)
    const response = e.response
    return {
      data: response.data,
      statusCode: response.status
    }
  }
}

export const register = async (name: string, address: string, email: string, password: string, device_id: string): Promise<ApiPayload> => {
  console.log({
    name,
    address,
    email,
    password,
    device_id
  })
  
  const data = new FormData()
  data.append('name', name)
  data.append('address', address)
  data.append('email', email)
  data.append('password', password)
  data.append('device_id', device_id)

  const client = createApiClient()

  try {
    const response = await client.post('/user/register', data)
    return {
      data: response.data,
      statusCode: response.status
    }
  } catch(e) {
    console.log('register error', e)
    const response = e.response
    return {
      data: response.data || null,
      statusCode: response.status
    }
  }
}

export const toggleLock = async (): Promise<ApiPayload> => {
  const client = createApiClient()

  try {
    const response = await client.get('/toggle')
    return {
      data: response.data,
      statusCode: response.status
    }
  } catch(e) {
    console.log('toggle failed', e)
    const response = e.response
    return {
      data: response.data || null,
      statusCode: response.status
    }
  }
}

export const lockStatus = async (token: string): Promise<ApiPayload> => {
  const client = createApiClient(token)

  try {
    const response = await client.get('/device/status')
    return {
      data: response.data,
      statusCode: response.status
    }
  } catch(e) {
    console.log('lockStatus failed', e)
    const response = e.response
    return {
      data: response.data || null,
      statusCode: response.status
    }
  }
}

export const loggedInUser = async (token: string): Promise<ApiPayload> => {
  const client = createApiClient(token)

  try {
    const response = await client.get('/user/logged_in')
    return {
      data: response.data,
      statusCode: response.status
    }
  } catch(e) {
    console.log('me failed', e)
    const response = e.response
    return {
      data: response.data || null,
      statusCode: response.status
    }
  }
}
