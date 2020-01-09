import React, { ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface Props {
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

const Center = ({ children, style }: Props) => {
  const styles = StyleSheet.compose<ViewStyle>(
    {
      justifyContent: 'center',
      alignItems: 'center'
    },
    style
  )

  return <View style={styles}>{children}</View>
}

export default Center
