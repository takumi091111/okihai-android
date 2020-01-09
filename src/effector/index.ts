import { createStoreObject } from 'effector'

import { errorDialog } from '@/effector/stores/errorDialog'
import { loggedInEmployee, loggedInUser } from '@/effector/stores/loggedIn'
import { noticeToken } from '@/effector/stores/noticeToken'
import { token } from '@/effector/stores/token'

export const userStore = createStoreObject({
  token,
  noticeToken,
  loggedInUser,
  errorDialog
})

export const employeeStore = createStoreObject({
  token,
  noticeToken,
  loggedInEmployee,
  errorDialog
})
