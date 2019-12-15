import { AxiosError } from 'axios'
import { UpdateErrorDialog } from '@/store/events'
import { CONNECTION_ERROR, LOGIN_ERROR } from '@/utils/errors'

interface ErrorMessage {
  [key: string]: string | string[]
}

interface ErrorData {
  errors: ErrorMessage
}

const joinErrors = ({ errors }: ErrorData) => {
  return Object.entries(errors)
    .map(([key, value]) => {
      if (typeof value !== 'object') {
        return { [key]: value }
      }
      return { [key]: value.join('\n') }
    })
    .reduce((acc, curt) => ({ ...acc, ...curt }))
}

const showConnectionError = (error: AxiosError<null>): AxiosError<null> => {
  // ログアウト画面ではエラーを表示させない
  const isLogout = /logout$/.test(error.config.url)
  if (isLogout) return error

  UpdateErrorDialog({
    errorDialog: {
      title: CONNECTION_ERROR.COMMON_SUMMARY,
      message: CONNECTION_ERROR.COMMON_DESCRIPTION,
      isVisible: true
    }
  })
  return error
}

const showUnauthorizedError = (error: AxiosError<null>): AxiosError<null> => {
  // スプラッシュ画面ではエラーを表示させない
  const isLoggedIn = /logged_in$/.test(error.config.url)
  if (isLoggedIn) return error

  UpdateErrorDialog({
    errorDialog: {
      title: LOGIN_ERROR.SUMMARY,
      message: LOGIN_ERROR.EMAIL_OR_PASSWORD_INVALID,
      isVisible: true
    }
  })
  return error
}

const showPostError = (error: AxiosError<ErrorData>): AxiosError<ErrorData> => {
  error.response.data.errors = joinErrors(error.response.data)
  return error
}

const handlers = {
  401: showUnauthorizedError,
  422: showPostError
}

export const errorHandler = (error: AxiosError): AxiosError => {
  const statusCode = error.response.status
  const handler = handlers[statusCode] || showConnectionError
  return handler(error)
}
