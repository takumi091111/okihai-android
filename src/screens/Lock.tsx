import React, { useState, useCallback } from 'react'
import { TouchableWithoutFeedback, StyleSheet, ActivityIndicator } from 'react-native'
import { Header, Text, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation, useFocusEffect } from 'react-navigation-hooks'
import Container from '@/components/Container'
import CircleProgressBar from '@/components/CircleProgressBar'
import { toggleLock, lockStatus } from '@/utils/api'

const styles = StyleSheet.create({
  icon: {
    top: -180
  },
  text: {
    top: -50,
    fontSize: 24,
    fontWeight: '600'
  }
})

export default () => {
  const { state, navigate } = useNavigation()
  const [isLocked, setIsLocked] = useState(true)
  const [isActive, setIsActive] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const handlePressIn = () => {
    setIsActive(true)
  }

  const handlePressOut = () => {
    setIsActive(false)
  }

  const fetchLockStatus = async () => {
    setIsLoading(true)
    const result = await lockStatus()
    if (result.ok === true) {
      setIsError(false)
      setIsLocked(result.data.is_locked)
    } else if (result.statusCode === 500) {
      setIsError(true)
    }
    setIsLoading(false)
  }

  const handleProgressComplete = async () => {
    setIsActive(false)
    setIsLoading(true)
    const result = await toggleLock()
    if (result.ok === true) {
      setIsLocked(result.data.is_locked)
    }
    setIsLoading(false)
  }

  useFocusEffect(useCallback(() => {
    fetchLockStatus()
    return () => null
  }, []))

  return (
    <>
      <Header
        centerComponent={{
          text: state.params.title
        }}
        rightComponent={{
          type: 'feather',
          icon: 'log-out',
          color: '#ff7675',
          onPress: () => navigate('Logout')
        }}
      />
      <Container isCenter={true}>
        { isLoading ?
          <ActivityIndicator
            size='large'
            color='#000000'
          /> :
          isError ?
          <>
            <Text>箱がオフラインです</Text>
            <Button
              title='更新'
              onPress={fetchLockStatus}
            />
          </> :
          <>
            <CircleProgressBar
              size={250}
              lineWidth={1.3}
              backgroundColor='#ffffff'
              progressColor='#00b894'
              fillColor={isLocked ? '#ff7675' : '#00b894'}
              active={isActive}
              onProgressComplete={handleProgressComplete}
            />
            <TouchableWithoutFeedback
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <Icon
                size={100}
                color='#f7f7f7'
                name={isLocked ? 'lock' : 'unlock'}
                style={styles.icon}
              />
            </TouchableWithoutFeedback>
            <Text style={styles.text}>
              {isLocked ? 'ロック中' : '解錠済み'}
            </Text>
          </>
        }
      </Container>
    </>
  )
}
