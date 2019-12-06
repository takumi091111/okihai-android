import React, { useCallback } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useNavigation, useFocusEffect } from 'react-navigation-hooks'
import { appStart, loginIfLoggedIn } from '@/store/actions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
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
  }, []))

  return (
    <View style={styles.container}>
      <Text style={styles.text}>OKIHAI</Text>
    </View>
  )
}
