import React, { ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface Props {
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

const Row = ({ children, style }: Props) => {
  const styles = StyleSheet.compose<ViewStyle>(
    {
      width: '100%',
      paddingTop: 10,
      paddingBottom: 10
    },
    style
  )

  return <View style={styles}>{children}</View>
}

export default Row
