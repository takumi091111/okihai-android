import { Notifications } from 'expo'
import { askAsync, getAsync, NOTIFICATIONS } from 'expo-permissions'

import { NotificationResult } from '@/interfaces/Result'

export const registerForPushNotification = async (): Promise<NotificationResult> => {
  // 通知へのアクセス許可を取得
  const { status: existingStatus } = await getAsync(NOTIFICATIONS)
  let finalStatus = existingStatus

  // アクセス許可をしていない場合に尋ねる
  if (existingStatus !== 'granted') {
    const { status } = await askAsync(NOTIFICATIONS)
    finalStatus = status
  }

  // アクセス許可をしなかった場合
  if (finalStatus !== 'granted') {
    return {
      ok: false
    }
  }

  // デバイスを識別するためのIDを取得
  const token = await Notifications.getExpoPushTokenAsync()

  return {
    ok: true,
    data: {
      token
    }
  }
}
