export type Token = string | null
export type NoticeToken = string | null
export type LoggedIn<T> = T | null

export interface ErrorDialog {
  title: string
  message: string
}

export interface State<T> {
  token: string | null
  loggedIn: LoggedIn<T>
  errorDialog: ErrorDialog
}
