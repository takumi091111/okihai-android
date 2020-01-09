import { createStore } from 'effector'

import { Logout, UpdateEmployee, UpdateUser } from '@/effector/events'
import { Employee } from '@/interfaces/Employee'
import { LoggedIn } from '@/interfaces/State'
import { User } from '@/interfaces/User'

export const loggedInUser = createStore<LoggedIn<User>>(null)
  .on(UpdateUser, (_state, user) => user)
  .on(Logout, _state => null)

export const loggedInEmployee = createStore<LoggedIn<Employee>>(null)
  .on(UpdateEmployee, (_state, employee) => employee)
  .on(Logout, _state => null)
