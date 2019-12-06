import React from 'react'
import { Header } from 'react-native-elements'

interface Props {
  text?: string
  isStack?: boolean
  onMenuButtonPress?: () => void
}

export default ({ text = '置き配', isStack = false, onMenuButtonPress }: Props) => (
  <Header
    leftComponent={{
      type: 'feather',
      icon: isStack ? 'arrow-left' : 'menu',
      onPress: onMenuButtonPress
    }}
    centerComponent={{ text }}
  />
)
