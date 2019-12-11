import { store } from '@/store'
import { Login, Active, Logout } from '@/store/events'
import { loadToken, saveToken, clearToken } from '@/utils/storage'
import { registerForPushNotification } from '@/utils/notification'
import * as Api from '@/utils/api'
import { ActionPayload } from '@/interfaces/Payload'

export const login = async (
  email: string,
  password: string
): Promise<ActionPayload> => {
  const { noticeToken } = await store.getState()
  const response = await Api.login(email, password, noticeToken)

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
  const { token } = store.getState()
  await Api.logout(token)
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

export const getLoggedInUser = async (): Promise<ActionPayload> => {
  const { token } = store.getState()
  const result = await Api.loggedInUser(token)
  console.log({ token, result })
  
  return {
    state: result.data,
    errors: {}
  }
}

export const getLockStatus = async (): Promise<ActionPayload> => {
  const { token } = store.getState()
  const result = await Api.lockStatus(token)
  console.log({ token, result })
  
  return {
    state: result.data,
    errors: {}
  }
}

export const appStart = async (): Promise<ActionPayload> => {
  const token = await loadToken()
  const { data } = await registerForPushNotification()
  const noticeToken = data.token

  return {
    state: Active({ token, noticeToken }),
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
