import {
  askAsync,
  getAsync,
  PermissionStatus,
  PermissionType
} from 'expo-permissions'
import { useCallback, useEffect, useState } from 'react'
const { GRANTED } = PermissionStatus

export const usePermission = (type: PermissionType) => {
  const [isDenied, setIsDenied] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)

  const getPermission = async () => {
    const { status } = await getAsync(type)
    if (status !== GRANTED) return
    setHasPermission(true)
  }

  const askPermission = async () => {
    const { status } = await askAsync(type)
    if (status !== GRANTED) {
      setIsDenied(true)
      setHasPermission(false)
      return
    }
    setIsDenied(false)
    setHasPermission(true)
  }

  useEffect(
    useCallback(() => {
      getPermission()
    }, []),
    []
  )

  return { hasPermission, isDenied, askPermission }
}
