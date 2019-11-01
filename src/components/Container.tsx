import React, { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'

interface Props {
  children?: ReactNode
  isCenter?: boolean
}

const containerStyle = (isCenter: boolean) => StyleSheet.flatten({
  flex: 1,
  justifyContent: isCenter ? 'center' : 'flex-start',
  alignItems: isCenter ? 'center': 'flex-start'
})

export default ({ children, isCenter = false }: Props) => (
  <View style={containerStyle(isCenter)}>
    { children }
  </View>
)
