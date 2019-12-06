import { createEvent } from 'effector'
import { State } from '@/interfaces/State'

export const Login = createEvent<State>('Login')
export const Logout = createEvent('Logout')
export const Active = createEvent<State>('Active')
export const Inactive = createEvent('Inactive')
