import { createStore } from 'effector'

import { UpdateNoticeToken } from '@/effector/events'
import { NoticeToken } from '@/interfaces/State'

export const noticeToken = createStore<NoticeToken>(null).on(
  UpdateNoticeToken,
  (_state, noticeToken) => noticeToken
)
