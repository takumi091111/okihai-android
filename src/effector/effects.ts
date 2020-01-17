import { createEffect } from 'effector'
import { AsyncStorage } from 'react-native'

import { registerForPushNotification } from '@/utils/notification'

export const fetchNoticeToken = createEffect({
  handler: async () => {
    const result = await registerForPushNotification()
    if (result.ok === true) {
      return result.data.token
    } else {
      return null
    }
  }
})

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
