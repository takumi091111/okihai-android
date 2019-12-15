import { useCallback } from 'react'
import { useNavigation, useFocusEffect } from 'react-navigation-hooks'
import { Logout } from '@/store/events'
import { logout } from '@/utils/api'

export default () => {
  const { navigate } = useNavigation()

  useFocusEffect(useCallback(() => {
    const f = async () => {
      Logout()
      await logout()
      navigate('Splash')
    }
    f()
    return () => null
  }, []))

  return null
}
