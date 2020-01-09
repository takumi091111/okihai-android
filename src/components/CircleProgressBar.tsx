import hexToRgba from 'hex-to-rgba'
import React, { useEffect, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Circle, Svg } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

interface Props {
  size: number
  lineWidth: number
  backgroundColor: string
  progressColor: string
  fillColor?: string
  active?: boolean
  onProgressComplete?: () => void
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  svg: {
    transform: [{ rotate: '-90deg' }]
  }
})

const CircleProgressBar = (props: Props) => {
  const {
    size,
    lineWidth,
    backgroundColor,
    progressColor,
    fillColor = 'none',
    active = false,
    onProgressComplete
  } = props
  const [animate] = useState(new Animated.Value(0))
  const [strokeAnimate] = useState(new Animated.Value(0))

  const offset = animate.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0]
  })

  const stroke = strokeAnimate.interpolate({
    inputRange: [0, 1],
    outputRange: [hexToRgba(progressColor, 0.3), hexToRgba(progressColor, 1.0)]
  })

  const inAnimated = Animated.parallel([
    Animated.timing(animate, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true
    }),
    Animated.timing(strokeAnimate, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true
    })
  ])

  const outAnimated = Animated.parallel([
    Animated.timing(animate, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }),
    Animated.timing(strokeAnimate, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    })
  ])

  const progressIn = () => {
    inAnimated.start(({ finished }) => {
      if (!finished) return
      if (onProgressComplete) onProgressComplete()
    })
  }

  const progressOut = () => {
    outAnimated.start()
  }

  useEffect(() => {
    if (active) {
      progressIn()
    } else {
      progressOut()
    }
  }, [active])

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox="-1 -1 34 34" style={styles.svg}>
        <AnimatedCircle
          cx="16"
          cy="16"
          r="15.9155"
          fill={fillColor}
          stroke={backgroundColor}
          strokeWidth={lineWidth}
        />
        <AnimatedCircle
          cx="16"
          cy="16"
          r="15.9155"
          fill="none"
          stroke={stroke}
          strokeWidth={lineWidth}
          strokeDasharray="100 100"
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  )
}

export default CircleProgressBar
