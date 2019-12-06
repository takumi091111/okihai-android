import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { Svg, Circle } from 'react-native-svg'
import hexToRgba from 'hex-to-rgba'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent:'center'
  },
  svg: {
    transform: [
      { rotate: '-90deg' }
    ]
  }
})

interface Props {
  size: number
  lineWidth: number
  backgroundColor: string
  progressColor: string
  active?: boolean
  onProgressComplete?: () => void
}

export default (props: Props) => {
  const {
    size,
    lineWidth,
    backgroundColor,
    progressColor,
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
      useNativeDriver: false
    }),
    Animated.timing(strokeAnimate, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false
    })
  ])

  const outAnimated = Animated.parallel([
    Animated.timing(animate, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }),
    Animated.timing(strokeAnimate, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    })
  ])

  const progressIn = () => {
    inAnimated.start(({ finished }) => {
      if (!finished) return
      onProgressComplete()
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
      <Svg
        width={size}
        height={size}
        viewBox='-1 -1 34 34'
        style={styles.svg}>
        <AnimatedCircle
          cx='16'
          cy='16'
          r='15.9155'
          fill='none'
          stroke={backgroundColor}
          strokeWidth={lineWidth}
        />
        <AnimatedCircle
          cx='16'
          cy='16'
          r='15.9155'
          fill='none'
          stroke={stroke}
          strokeWidth={lineWidth}
          strokeDasharray='100 100'
          strokeDashoffset={offset}
          strokeLinecap='round'
        />
      </Svg>
    </View>
  )
}
