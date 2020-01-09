import { AxiosError } from 'axios'

import { UpdateErrorDialog } from '@/effector/events'
import { ErrorResponse } from '@/interfaces/Response'
import { CONNECTION_ERROR, LOGIN_ERROR, NO_LOCK_ERROR } from '@/utils/errors'

const joinErrors = ({ errors }: ErrorResponse) => {
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
    title: CONNECTION_ERROR.COMMON_SUMMARY,
    message: CONNECTION_ERROR.COMMON_DESCRIPTION
  })
  return error
}

const showUnauthorizedError = (error: AxiosError<null>): AxiosError<null> => {
  // スプラッシュ画面ではエラーを表示させない
  const isLoggedIn = /logged_in$/.test(error.config.url)
  if (isLoggedIn) return error

  UpdateErrorDialog({
    title: LOGIN_ERROR.SUMMARY,
    message: LOGIN_ERROR.EMAIL_OR_PASSWORD_INVALID
  })
  return error
}

const showValidationError = (
  error: AxiosError<ErrorResponse>
): AxiosError<ErrorResponse> => {
  // 置き配ボックスがデータベースに登録されていない場合
  showLockNotFoundError(error)

  error.response.data.errors = joinErrors(error.response.data)
  return error
}

const showLockNotFoundError = (error: AxiosError<any>): AxiosError<any> => {
  // QR読取画面、手動入力画面、ロック画面以外ではエラーを表示させない
  const isLockStatus = /status$/.test(error.config.url)
  if (!isLockStatus) return error

  UpdateErrorDialog({
    title: NO_LOCK_ERROR.SUMMARY,
    message: NO_LOCK_ERROR.DEVICE_NOT_FOUND
  })
  return error
}

const handlers = {
  401: showUnauthorizedError,
  422: showValidationError,
  500: showLockNotFoundError
}

export const errorHandler = (error: AxiosError): AxiosError => {
  const statusCode = error.response.status
  const handler = handlers[statusCode] || showConnectionError
  return handler(error)
}
