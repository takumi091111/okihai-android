import { useStore } from 'effector-react'
import React, { useCallback } from 'react'
import { ToastAndroid } from 'react-native'
import { Text } from 'react-native-elements'
import { useFocusEffect, useNavigation } from 'react-navigation-hooks'

import Center from '@/components/Center'
import { Logout as LogoutEvent } from '@/effector/events'
import { loggedInEmployee, loggedInUser } from '@/effector/stores/loggedIn'
import { logout as logoutEmployee } from '@/utils/api/emp'
import { logout as logoutUser } from '@/utils/api/user'

const Logout = () => {
  const { navigate } = useNavigation()
  const user = useStore(loggedInUser)
  const emp = useStore(loggedInEmployee)

  const navigateNotLoggedInAfterLogout = async () => {
    if (user) await logoutUser()
    if (emp) await logoutEmployee()
    LogoutEvent()
    setTimeout(() => {
      navigate('NotLoggedIn')
      ToastAndroid.show('ログアウトしました', ToastAndroid.SHORT)
    }, 500)
  }

  useFocusEffect(
    useCallback(() => {
      navigateNotLoggedInAfterLogout()
      return () => null
    }, [])
  )

  return (
    <Center style={{ flex: 1 }}>
      <Text h4>ログアウト中...</Text>
    </Center>
  )
}

export default Logout
