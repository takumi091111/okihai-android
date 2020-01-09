import React from 'react'
import { Transition } from 'react-native-reanimated'
import { StackCardStyleInterpolator } from 'react-navigation-stack'

export const switchTransition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={300} />
  </Transition.Together>
)

export const forFade: StackCardStyleInterpolator = ({ current }) => ({
  containerStyle: {
    backgroundColor: 'transparent'
  },
  overlayStyle: {
    backgroundColor: 'transparent'
  },
  cardStyle: {
    backgroundColor: 'transparent',
    opacity: current.progress
  }
})
