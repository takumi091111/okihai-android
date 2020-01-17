import { createStore } from 'effector'

import { fetchNoticeToken } from '@/effector/effects'
import { UpdateNoticeToken } from '@/effector/events'
import { NoticeToken } from '@/interfaces/State'

export const noticeToken = createStore<NoticeToken>(null)
  .on(fetchNoticeToken.done, (_state, { result }) => result)
  .on(UpdateNoticeToken, (_state, noticeToken) => noticeToken)

fetchNoticeToken()
