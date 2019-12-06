import { useState, useEffect, useCallback } from 'react'
import { BackHandler, AppState, AppStateStatus } from 'react-native'

export const useBackButton = (handler: () => void) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handler)
    }
  }, [])
}

interface AppStateConfig {
  onChange?: () => void
  onForeground?: () => void
  onBackground?: () => void
}

export const useAppState = (config?: AppStateConfig) => {
  const [appState, setAppState] = useState(AppState.currentState)

  useEffect(useCallback(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      const isActive = appState === 'active'
      const isNextActive = nextAppState === 'active'
      const isNextBackground = nextAppState.match(/inactive|background/)

      if (isNextActive) {
        config && config.onForeground && config.onForeground()
      } else if (isActive && isNextBackground) {
        config && config.onBackground && config.onBackground()
      }

      setAppState(nextAppState)
      config && config.onChange && config.onChange()
    }

    AppState.addEventListener('change', handleAppStateChange)

    return () => {
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }, []))

  return appState
}
