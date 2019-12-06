import { AsyncStorage } from 'react-native'

export const saveToken = async (token: string) => {
  AsyncStorage.setItem('token', token)
}

export const loadToken = async () => {
  return AsyncStorage.getItem('token')
}

export const clearToken = async () => {
  AsyncStorage.removeItem('token')
}

export const clearStorage = async () => {
  AsyncStorage.clear()
}
