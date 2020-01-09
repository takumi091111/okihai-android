import React, { createElement, FunctionComponent, useState } from 'react'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

import CircleProgressBar from '@/components/CircleProgressBar'

interface Props {
  size: number
  lineWidth: number
  backgroundColor: string
  progressColor: string
  fillColor?: string
  disabled?: boolean
  centerComponent?: FunctionComponent
  onProgressComplete?: () => void
}

const TouchableCircleProgressBar = ({
  size,
  lineWidth,
  backgroundColor,
  progressColor,
  fillColor,
  disabled = false,
  centerComponent,
  onProgressComplete
}: Props) => {
  const [isProgress, setIsProgress] = useState(false)

  const handlePressIn = () => setIsProgress(true)
  const handlePressOut = () => setIsProgress(false)
  const handleProgressComplete = () => {
    setIsProgress(false)
    if (onProgressComplete) onProgressComplete()
  }

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      height: size,
      paddingTop: size - 30
    },
    centerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      top: size * -1 + 15,
      width: size - 30,
      height: size - 30,
      borderRadius: 100
    }
  })

  return (
    <View style={styles.container}>
      <CircleProgressBar
        size={size}
        lineWidth={lineWidth}
        backgroundColor={backgroundColor}
        progressColor={progressColor}
        fillColor={fillColor}
        active={isProgress}
        onProgressComplete={handleProgressComplete}
      />
      <TouchableWithoutFeedback
        onPressIn={!disabled ? handlePressIn : null}
        onPressOut={handlePressOut}
      >
        <View style={styles.centerContainer}>
          {createElement(centerComponent)}
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default TouchableCircleProgressBar
