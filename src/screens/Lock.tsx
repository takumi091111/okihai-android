import React, { useState } from 'react'
import { TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from 'react-navigation-hooks'
import Container from '@/components/Container'
import Header from '@/components/Header'
import CircleProgressBar from '@/components/CircleProgressBar'
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
  const { state, goBack } = useNavigation()
  const [isLocked, setIsLocked] = useState(true)
  const [isActive, setIsActive] = useState(false)

  const handlePressIn = () => {
    setIsActive(true)
  }

  const handlePressOut = () => {
    setIsActive(false)
  }

  const handleProgressComplete = async () => {
    console.log('toggle')
    setIsActive(false)
    const payload = await toggleLock()
    const { is_locked } = payload.data
    setIsLocked(is_locked)
  }

  return (
    <>
      <Header
        text={state.params.title}
        isStack={true}
        onMenuButtonPress={() => goBack()}
      />
      <Container isCenter={true}>
        <CircleProgressBar
          size={250}
          lineWidth={1.3}
          backgroundColor='#f7f7f7'
          progressColor='#00b894'
          active={isActive}
          onProgressComplete={handleProgressComplete}
        />
        <TouchableWithoutFeedback
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Icon
            name={isLocked ? 'lock' : 'unlock'}
            size={100}
            style={styles.icon}
          />
        </TouchableWithoutFeedback>
        <Text style={styles.text}>
          {isLocked ? 'LOCKED' : 'UNLOCKED'}
        </Text>
      </Container>
    </>
  )
}

export default Lock
