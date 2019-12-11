import React, { useState, useCallback } from 'react'
import { TouchableWithoutFeedback, StyleSheet, ActivityIndicator } from 'react-native'
import { Header, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation, useFocusEffect } from 'react-navigation-hooks'
import Container from '@/components/Container'
import CircleProgressBar from '@/components/CircleProgressBar'
import { getLockStatus } from '@/store/actions'
import { toggleLock } from '@/utils/api'

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

const Lock = () => {
  const { state, navigate } = useNavigation()
  const [isLocked, setIsLocked] = useState(true)
  const [isActive, setIsActive] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handlePressIn = () => {
    setIsActive(true)
  }

  const handlePressOut = () => {
    setIsActive(false)
  }

  const handleProgressComplete = async () => {
    console.log('toggle')
    setIsActive(false)
    setIsLoading(true)
    const payload = await toggleLock()
    const { is_locked } = payload.data
    setIsLoading(false)
    setIsLocked(is_locked)
  }

  useFocusEffect(useCallback(() => {
    const f = async () => {
      setIsLoading(true)
      const { state } = await getLockStatus()
      const { is_locked } = state
      setIsLocked(is_locked)
      setIsLoading(false)
    }
    f()
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

export default Lock
