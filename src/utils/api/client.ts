import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { AsyncStorage } from 'react-native'

import { Result } from '@/interfaces/Result'
import { errorHandler } from '@/utils/errorHandler'

const API_URL = 'https://f082166e.ap.ngrok.io/api'

export const createClient = (basePath?: string) => {
  let client: AxiosInstance

  if (!basePath) {
    client = axios.create({ baseURL: `${API_URL}` })
  } else {
    const joinedUrl = [API_URL, basePath].join('/')
    client = axios.create({ baseURL: joinedUrl })
  }

  client.interceptors.request.use(async request => {
    // ログイン時はトークンを付けない
    const isLogin = /login$/.test(request.url)
    if (isLogin) return request

    const token = await AsyncStorage.getItem('token')
    request.headers = {
      Authorization: token ? `Bearer ${token}` : ''
    }
    console.log(request.url)
    console.log({ params: request.params, data: request.data })
    return request
  })

  client.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      const response = error.response
      console.log(response.status, response.data)
      return Promise.reject(errorHandler(error))
    }
  )

  return client
}

export const request = async <D, DE>(
  client: AxiosInstance,
  config: AxiosRequestConfig
): Promise<Result<D, DE>> => {
  const { status, data } = await client
    .request<D>(config)
    .catch((error: AxiosError<DE>) => error.response)

  return {
    data,
    ok: status === 200,
    statusCode: status
  } as Result<D, DE>
}
