import { SplashScreen } from 'expo'
import { useCallback, useEffect, useState } from 'react'

interface Props {
  waitSec: number
  onStart: () => void
  onEnd: () => void
}

export const useSplashScreen = ({ waitSec, onStart, onEnd }: Props) => {
  const [isReady, setIsReady] = useState(false)

  const hide = async () => {
    if (!isReady) onStart()
    setTimeout(() => {
      if (!isReady) onEnd()
      SplashScreen.hide()
      setIsReady(true)
    }, waitSec)
  }

  useEffect(
    useCallback(() => {
      SplashScreen.preventAutoHide()
    }, []),
    []
  )

  return { isReady, hide }
}
