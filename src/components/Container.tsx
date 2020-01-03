import React, { ReactNode } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

interface Props {
  children?: ReactNode
  isCenter?: boolean
}

const containerStyle = (isCenter: boolean) => StyleSheet.flatten({
  flex: 1,
  justifyContent: isCenter ? 'center' : 'flex-start',
  alignItems: isCenter ? 'center': 'stretch'
})

export default ({ children, isCenter = false }: Props) => (
  <ScrollView scrollEnabled={true} contentContainerStyle={containerStyle(isCenter)}>
    { children }
  </ScrollView>
)
