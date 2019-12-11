import React, { useCallback } from 'react'
import { StyleSheet, Text } from 'react-native'
import { useNavigation, useFocusEffect } from 'react-navigation-hooks'
import { appStart, loginIfLoggedIn } from '@/store/actions'
import Container from '@/components/Container'

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    letterSpacing: 5
  }
})

export default () => {
  const { navigate } = useNavigation()

  const navigateToLoggedInOrNotLoggedIn = async () => {
    await appStart()
    const payload = await loginIfLoggedIn()
    const isLoggedIn = payload.state !== null
    const routeName = isLoggedIn ? 'LoggedIn' : 'NotLoggedIn'
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
      <Text style={styles.text}>OKIHAI</Text>
    </Container>
  )
}
