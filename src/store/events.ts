import { createEvent } from 'effector'
import { State } from '@/interfaces/State'

type LoginState = Pick<State, 'token'>
type UpdateUserState = Pick<State, 'user'>
type UpdateErrorDialog = Pick<State, 'errorDialog'>

export const Login = createEvent<LoginState>('Login')
export const Logout = createEvent('Logout')
export const Active = createEvent('Active')
export const UpdateUser = createEvent<UpdateUserState>('UpdateUser')
export const UpdateErrorDialog = createEvent<UpdateErrorDialog>('UpdateErrorDialog')
export const ToggleErrorDialog = createEvent('ToggleErrorDialog')

Login.watch(() => console.log('Login'))
Logout.watch(() => console.log('Logout'))
Active.watch(() => console.log('Active'))
UpdateUser.watch(() => console.log('UpdateUser'))
UpdateErrorDialog.watch(() => console.log('UpdateErrorDialog'))
ToggleErrorDialog.watch(() => console.log('ToggleErrorDialog'))
