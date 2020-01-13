import { createEvent } from 'effector'

import { Employee } from '@/interfaces/Employee'
import { ErrorDialog, LoggedIn, NoticeToken, Token } from '@/interfaces/State'
import { User } from '@/interfaces/User'

export const Login = createEvent<Token>('Login')
export const Logout = createEvent('Logout')
export const UpdateNoticeToken = createEvent<NoticeToken>('UpdateNoticeToken')
export const UpdateUser = createEvent<LoggedIn<User>>('Update')
export const UpdateEmployee = createEvent<LoggedIn<Employee>>('Update')
export const UpdateErrorDialog = createEvent<Partial<ErrorDialog>>(
  'UpdateErrorDialog'
)
export const ToggleErrorDialog = createEvent('ToggleErrorDialog')

Login.watch(() => console.log('Login'))
Logout.watch(() => console.log('Logout'))
UpdateNoticeToken.watch((token) => console.log('UpdateNoticeToken', token))
UpdateUser.watch(() => console.log('UpdateUser'))
UpdateEmployee.watch(() => console.log('UpdateEmployee'))
UpdateErrorDialog.watch(() => console.log('UpdateErrorDialog'))
ToggleErrorDialog.watch(() => console.log('ToggleErrorDialog'))
