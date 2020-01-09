import { createStore } from 'effector'

import { UpdateErrorDialog } from '@/effector/events'
import { ErrorDialog } from '@/interfaces/State'

export const errorDialog = createStore<ErrorDialog>({
  title: 'Title',
  message: 'Message'
}).on(UpdateErrorDialog, (state, errorDialog) => {
  return {
    ...state,
    ...errorDialog
  }
})
