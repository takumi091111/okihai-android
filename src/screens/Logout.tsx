import { useCallback } from 'react'
import { useNavigation, useFocusEffect } from 'react-navigation-hooks'
import { logout } from '@/store/actions'

const Logout = () => {
  const { navigate } = useNavigation()

  useFocusEffect(useCallback(() => {
    logout()
    navigate('Splash')
    return () => null
  }, []))

  return null
}

export default Logout
