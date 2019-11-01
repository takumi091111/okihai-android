import React from 'react'
import { Header } from 'react-native-elements'

interface Props {
  text?: string
  onMenuButtonPress?: () => void
}

export default ({ text = '置き配', onMenuButtonPress }: Props) => (
  <Header
    leftComponent={{
      type: 'feater',
      icon: 'menu',
      onPress: onMenuButtonPress
    }}
    centerComponent={{ text }}
  />
)
