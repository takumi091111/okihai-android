import { createStore } from 'effector'

import { UpdateNoticeToken } from '@/effector/events'
import { NoticeToken } from '@/interfaces/State'
import { fetchNoticeToken } from '@/effector/effects'

export const noticeToken = createStore<NoticeToken>(null)
.on(fetchNoticeToken.done, (_state, { result }) => result)
.on(
  UpdateNoticeToken,
  (_state, noticeToken) => noticeToken
)

fetchNoticeToken()
