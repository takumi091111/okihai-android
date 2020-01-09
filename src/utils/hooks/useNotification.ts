import { Notifications } from 'expo'
import {
  askAsync,
  getAsync,
  NOTIFICATIONS,
  PermissionStatus
} from 'expo-permissions'
import { useCallback, useEffect, useState } from 'react'
const { GRANTED } = PermissionStatus

export const useNotification = () => {
  const [isDenied, setIsDenied] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  const getToken = async () => {
    const token = await Notifications.getExpoPushTokenAsync()
    setToken(token)
  }

  const getPermissionWithToken = async () => {
    const { status } = await getAsync(NOTIFICATIONS)
    if (status !== GRANTED) return
    setHasPermission(true)
    getToken()
  }

  const askPermissionWithToken = async () => {
    const { status } = await askAsync(NOTIFICATIONS)
    if (status !== GRANTED) {
      setIsDenied(true)
      setHasPermission(false)
      return
    }
    setIsDenied(false)
    setHasPermission(true)
    getToken()
  }

  useEffect(
    useCallback(() => {
      getPermissionWithToken()
    }, []),
    []
  )

  return { hasPermission, isDenied, token, askPermissionWithToken }
}
