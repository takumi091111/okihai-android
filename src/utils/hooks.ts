import { useEffect } from 'react'
import { BackHandler } from 'react-native'

export const useBackButton = (handler: () => void) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handler)
    }
  }, [])
}
