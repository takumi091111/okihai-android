import { createStore } from 'effector'
import { State } from '@/interfaces/State'
import {
  Login,
  Logout,
  UpdateUser,
  UpdateErrorDialog,
  ToggleErrorDialog
} from '@/store/events'
import {
  fetchNoticeToken,
  fetchTokenFromAsyncStorage,
  updateTokenInAsyncStorage
} from '@/store/effects'

const initialState: State = {
  token: null,
  noticeToken: null,
  user: null,
  errorDialog: {
    title: 'Title',
    message: 'Message',
    isVisible: false
  }
}

export const store = createStore(initialState)
  .on(Login, (state, { token }) => {
    updateTokenInAsyncStorage(token)
    return {
      ...state,
      token
    }
  })
  .on(Logout, (state) => {
    updateTokenInAsyncStorage('')
    return {
      ...state,
      token: null,
      user: null
    }
  })
  .on(fetchNoticeToken.done, (state, { result }) => {
    return {
      ...state,
      noticeToken: result
    }
  })
  .on(fetchTokenFromAsyncStorage.done, (state, { result }) => {
    return {
      ...state,
      token: result
    }
  })
  .on(UpdateUser, (state, { user }) => {
    return {
      ...state,
      user
    }
  })
  .on(UpdateErrorDialog, (state, { errorDialog }) => {
    return {
      ...state,
      errorDialog: {
        ...state.errorDialog,
        ...errorDialog
      }
    }
  })
  .on(ToggleErrorDialog, (state) => {
    const { isVisible } = state.errorDialog
    return {
      ...state,
      errorDialog: {
        ...state.errorDialog,
        isVisible: !isVisible
      }
    }
  })

store.watch((state, payload) => {
  console.log({ state, payload })
})

fetchTokenFromAsyncStorage()
fetchNoticeToken()
