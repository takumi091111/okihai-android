import { Notifications } from 'expo'
import { getAsync, askAsync, NOTIFICATIONS } from 'expo-permissions'
import { Result } from '@/interfaces/Result'

interface TokenData {
  token: string
}

type NotificationResult = Omit<Result<TokenData, null>, 'statusCode'>

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
