import React, { useCallback, useEffect, useState } from 'react'
import { ToastAndroid } from 'react-native'
import { ThemeProvider } from 'react-native-elements'

import { UpdateEmployee } from '@/effector/events'
import createAppContainer from '@/navigations/emp'
import { loggedIn } from '@/utils/api/emp'
import { useSplashScreen } from '@/utils/hooks/useSplashScreen'
import theme from '@/utils/theme'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { isReady, hide } = useSplashScreen({
    waitSec: 1000,
    onStart: () => console.log('Splash start'),
    onEnd: () => console.log('Splash close')
  })

  const hideSplashAfterLoggedIn = async () => {
    const result = await loggedIn()
    if (result.ok === true) {
      UpdateEmployee(result.data)
      setIsLoggedIn(true)
      ToastAndroid.show('ログインしました', ToastAndroid.SHORT)
    } else {
      setIsLoggedIn(false)
    }
    hide()
  }

  useEffect(
    useCallback(() => {
      hideSplashAfterLoggedIn()
    }, []),
    []
  )

  const AppContainer = createAppContainer(isLoggedIn)

  return isReady ? (
    <ThemeProvider theme={theme}>
      <AppContainer />
    </ThemeProvider>
  ) : null
}

export default App
