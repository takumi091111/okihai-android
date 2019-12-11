import { Notifications } from 'expo'
import { getAsync, askAsync, NOTIFICATIONS } from 'expo-permissions'
import { Result, Error } from '@/interfaces/Payload'

interface Token {
  token: string
}

export const registerForPushNotification = async (): Promise<Result<Token> & Error> => {
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
      success: false,
      errorMessage: 'Not granted',
      data: {
        token: null
      }
    }
  }

  // デバイスを識別するためのIDを取得
  const token = await Notifications.getExpoPushTokenAsync()

  return {
    success: true,
    data: {
      token
    }
  }
}
