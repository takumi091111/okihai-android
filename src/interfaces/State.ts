import { User } from '@/interfaces/User'
import { ErrorDialogState } from '@interfaces/ErrorDialogState'

export interface State {
  token: string | null
  noticeToken: string | null
  user: User | null
  errorDialog: ErrorDialogState
}
