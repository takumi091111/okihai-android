import React, { useCallback } from 'react'
import { Text } from 'react-native-elements'
import { useNavigation, useFocusEffect } from 'react-navigation-hooks'
import { Logout } from '@/store/events'
import { logout } from '@/utils/api'
import Container from '@/components/Container'

export default () => {
  const { navigate } = useNavigation()

  useFocusEffect(useCallback(() => {
    const f = async () => {
      await logout()
      Logout()
      navigate('Splash')
    }
    f()
    return () => null
  }, []))

  return (
    <Container isCenter>
      <Text h4>ログアウト中</Text>
    </Container>
  )
}
