import { store } from '@/store'
import { Login, Active, Logout } from '@/store/events'
import { loadToken, saveToken, clearToken } from '@/utils/storage'
import * as Api from '@/utils/api'
import { ActionPayload } from '@/interfaces/Payload'

export const login = async (
  email: string,
  password: string
): Promise<ActionPayload> => {
  const response = await Api.login(email, password)

  if (response.statusCode === 200) {
    const token = response.data.token
    console.log('save token', token)
    return {
      state: Login({ token }),
      errors: {}
    }
  }
  
  return {
    state: null,
    errors: {}
  }
}

export const register = async (
  name: string,
  address: string,
  email: string,
  password: string,
  device_id: string
): Promise<ActionPayload> => {
  const response = await Api.register(
    name,
    address,
    email,
    password,
    device_id
  )

  if (response.statusCode === 200) {
    const token = response.data.token
    console.log('save token', token)
    return {
      state: Login({ token }),
      errors: {}
    }
  }

  if (response.statusCode === 422) {
    const errors = response.data.errors
    return {
      state: null,
      errors
    }
  }

  return {
    state: null,
    errors: {}
  }
}

export const logout = async (): Promise<ActionPayload> => {
  await clearToken()
  return {
    state: Logout(),
    errors: {}
  }
}

export const loginIfLoggedIn = async (): Promise<ActionPayload> => {
  const { token } = store.getState()
  console.log('login if loggedIn', token)
  if (!token) {
    return {
      state: null,
      errors: {}
    }
  }

  const user = await Api.loggedInUser(token)

  if (user.statusCode === 200) {
    return {
      state: Login({ token }),
      errors: {}
    }
  }
  
  return {
    state: null,
    errors: {}
  }
}

export const appStart = async (): Promise<ActionPayload> => {
  const token = await loadToken()
  if (!token) {
    return {
      state: null,
      errors: {}
    }
  }

  return {
    state: Active({ token }),
    errors: {}
  }
}

export const appEnd = async (): Promise<ActionPayload> => {
  const { token } = store.getState()
  return {
    state: saveToken(token),
    errors: {}
  }
}
