import React, { useCallback } from 'react'
import { StyleSheet, Image } from 'react-native'
import { useNavigation, useFocusEffect } from 'react-navigation-hooks'
import Container from '@/components/Container'
import { UpdateUser } from '@/store/events'
import { loggedInUser } from '@/utils/api'

const styles = StyleSheet.create({
  icon: {
    width: 300,
    height: 300
  }
})

export default () => {
  const { navigate } = useNavigation()

  const navigateToLoggedInOrNotLoggedIn = async () => {
    const result = await loggedInUser()
    const routeName = result.ok ? 'LoggedIn' : 'NotLoggedIn'
    if (result.ok === true) {
      UpdateUser({ user: result.data })
    }
    setTimeout(() => {
      navigate(routeName)
    }, 1000)
  }

  useFocusEffect(useCallback(() => {
    navigateToLoggedInOrNotLoggedIn()
    return () => null
  }, []))

  return (
    <Container isCenter={true}>
      <Image
        source={require('@assets/logo.png')}
        style={styles.icon}
      />
    </Container>
  )
}
