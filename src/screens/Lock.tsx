import { useStore } from 'effector-react'
import React, { useCallback, useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'
import {
  useFocusEffect,
  useNavigation,
  useNavigationParam
} from 'react-navigation-hooks'

import Center from '@/components/Center'
import Header from '@/components/Header'
import Row from '@/components/Row'
import TouchableCircleProgressBar from '@/components/TouchableCircleProgressBar'
import { loggedInUser as store } from '@/effector/stores/loggedIn'
import { lockStatus, toggleLock } from '@/utils/api/common'
import { FILL_COLOR, PROGRESS_COLOR } from '@/utils/theme/colors'

enum ICON_NAME {
  LOCKED = 'lock',
  UNLOCKED = 'unlock',
  LOADING = 'loader',
  ERROR = 'x'
}

enum LOCK_STATUS {
  LOCKED = 'ロック中',
  UNLOCKED = '解錠済み',
  LOADING = '確認中...',
  ERROR = '通信エラー'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30
  },
  deviceId: {
    alignItems: 'center'
  },
  status: {
    alignItems: 'center'
  }
})

const Lock = () => {
  const title: string = useNavigationParam('title')
  const isEmployee: boolean = useNavigationParam('isEmployee')
  const initialLockState: boolean = useNavigationParam('is_locked')
  const loggedInUser = useStore(store)
  const { navigate, goBack } = useNavigation()
  const [isFirst, setIsFirst] = useState(true)
  const [isLocked, setIsLocked] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [deviceId] = useState<string>(
    useNavigationParam('device_id') || (loggedInUser && loggedInUser.device_id)
  )

  const fillColor = useMemo(() => {
    if (isLoading) return FILL_COLOR.LOADING
    if (isError) return FILL_COLOR.ERROR
    return isLocked ? FILL_COLOR.LOCKED : FILL_COLOR.UNLOCKED
  }, [isLocked, isLoading])

  const iconName = useMemo(() => {
    if (isLoading) return ICON_NAME.LOADING
    if (isError) return ICON_NAME.ERROR
    return isLocked ? ICON_NAME.LOCKED : ICON_NAME.UNLOCKED
  }, [isLocked, isLoading])

  const statusText = useMemo(() => {
    if (isLoading) return LOCK_STATUS.LOADING
    if (isError) return LOCK_STATUS.ERROR
    return isLocked ? LOCK_STATUS.LOCKED : LOCK_STATUS.UNLOCKED
  }, [isLocked, isLoading])

  const handlePressBack = () => goBack(null)
  const handlePressLogout = () => navigate('Logout')

  const fetchLockStatus = async () => {
    if (isFirst && initialLockState !== undefined) {
      setIsLocked(initialLockState)
      return
    }

    setIsError(false)
    setIsLoading(true)

    const result = await lockStatus(deviceId)

    if (result.ok === false) {
      setIsError(true)
      if (result.statusCode === 401) {
        navigate('Error')
      }
      if (result.statusCode === 404) {
        navigate('Error')
      }
      if (result.statusCode === 500) {
        navigate('Error')
      }
    }

    const { is_locked } = result.data
    setIsLocked(is_locked)
    setIsLoading(false)
    setIsFirst(false)
  }

  const handleProgressComplete = async () => {
    setIsError(false)
    setIsLoading(true)

    const result = await toggleLock(deviceId)

    if (result.ok === false) {
      setIsError(true)
      if (result.statusCode === 401) {
        navigate('Error')
      }
      if (result.statusCode === 404) {
        navigate('Error')
      }
      if (result.statusCode === 500) {
        navigate('Error')
      }
    }

    const { is_locked } = result.data
    setIsLocked(is_locked)
    setIsLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      if (isError || isLoading) return () => null
      fetchLockStatus()
      return () => null
    }, [])
  )

  return (
    <>
      <Header
        title={title}
        onPressBack={isEmployee ? handlePressBack : null}
        onPressLogout={!isEmployee ? handlePressLogout : null}
      />
      <Center style={styles.container}>
        <Row style={styles.deviceId}>
          <Text h4>{deviceId}</Text>
        </Row>
        <Row>
          <TouchableCircleProgressBar
            size={250}
            lineWidth={1.3}
            backgroundColor="#ffffff"
            progressColor={PROGRESS_COLOR.LOCKED}
            fillColor={fillColor}
            disabled={isLoading}
            onProgressComplete={
              isError ? fetchLockStatus : handleProgressComplete
            }
            centerComponent={() => (
              <Icon size={100} color="#f7f7f7" name={iconName} />
            )}
          />
        </Row>
        <Row style={styles.status}>
          <Text h3>{statusText}</Text>
        </Row>
      </Center>
    </>
  )
}

export default Lock
