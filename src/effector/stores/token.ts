import { createStore } from 'effector'

import {
  fetchTokenFromAsyncStorage,
  updateTokenInAsyncStorage
} from '@/effector/effects'
import { Login, Logout } from '@/effector/events'
import { Token } from '@/interfaces/State'

export const token = createStore<Token>(null)
  .on(fetchTokenFromAsyncStorage.done, (_state, { result }) => result)
  .on(Login, (_state, token) => {
    updateTokenInAsyncStorage(token)
    return token
  })
  .on(Logout, _state => {
    updateTokenInAsyncStorage('')
    return null
  })

fetchTokenFromAsyncStorage()
