import { createStore } from 'effector'
import { State } from '@/interfaces/State'
import { Login, Logout, Active } from '@/store/events'

// handler

const handleLogin = (state: State, payload: State) => {
  state.token = payload.token
}

const handleLogout = (state: State) => {
  state.token = null
}

const handleActive = (state: State, payload: State) => {
  state.token = payload.token
}

// store

const initialState: State = {
  token: null as string | null
}

export const store = createStore(initialState)
  .on(Login, handleLogin)
  .on(Logout, handleLogout)
  .on(Active, handleActive)

Login.watch(({ token }) => {
  console.log('login', token)
})

Logout.watch(() => {
  console.log('logout')
})

Active.watch(({ token }) => {
  console.log('active', token)
})
