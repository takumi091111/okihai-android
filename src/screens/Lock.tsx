import React, { useState, useEffect } from 'react'
import { TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import Icon from 'react-native-vector-icons/Feather'
import { NavigationContainerProps, withNavigation } from 'react-navigation'
import Container from '@/components/Container'
import Header from '@/components/Header'
import { toggleLock } from '@/utils/api'

const iconStyle = StyleSheet.flatten({
  top: -150
})

const Lock = ({ navigation }: NavigationContainerProps) => {
  const [isLocked, setIsLocked] = useState(true)
  const [lockButtonText, setLockButtonText] = useState('Unlock')
  const [progress, setProgress] = useState(0)
  const [isPressIn, setIsPressIn] = useState(false)
  const [isToggled, setIsToggled] = useState(false)

  useEffect(() => {
    setTimeout(async () => {
      if (!isPressIn) {
        setProgress(0)
        return
      }

      if (isToggled) {
        setProgress(0)
        return
      }

      if (progress === 100) {
        setProgress(0)
        setIsToggled(true)
        
        const response = await toggleLock()
        setIsLocked(response.is_locked)
      } else {
        setProgress(progress + 1)
      }
    }, 0)
  })

  const handlePressIn = () => {
    setIsPressIn(true)
  }

  const handlePressOut = () => {
    setIsPressIn(false)
    setIsToggled(false)
  }

  return (
    <>
      <Header
        text={navigation.state.params.title}
        onMenuButtonPress={() => navigation.toggleDrawer()}
      />
      <Container isCenter={true}>
        <AnimatedCircularProgress
          size={200}
          width={5}
          fill={progress}
          tintColor='#000'
          duration={0}
          lineCap='round'
        />
        {
          <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Icon
              name={isLocked ? 'lock' : 'unlock'}
              size={100}
              style={iconStyle}
            />
          </TouchableWithoutFeedback>
        }
      </Container>
    </>
  )
}

export default withNavigation(Lock)
