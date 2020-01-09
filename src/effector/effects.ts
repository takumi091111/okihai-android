import { createEffect } from 'effector'
import { AsyncStorage } from 'react-native'

export const fetchTokenFromAsyncStorage = createEffect({
  handler: async () => {
    return AsyncStorage.getItem('token')
  }
})

export const updateTokenInAsyncStorage = createEffect({
  handler: async (token: string) => {
    AsyncStorage.setItem('token', token)
  }
})

fetchTokenFromAsyncStorage.watch(() =>
  console.log('FetchTokenFromAsyncStorage')
)
updateTokenInAsyncStorage.watch(() => console.log('UpdateTokenInAsyncStorage'))
