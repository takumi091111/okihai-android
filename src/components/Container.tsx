import React, { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

interface Props {
  children?: ReactNode
  verticalCenter?: boolean
  horizontalCenter?: boolean
  margin?: number
}

const createStyle = (
  verticalCenter: boolean,
  horizontalCenter: boolean,
  margin: number
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: verticalCenter ? 'center' : 'stretch',
      justifyContent: horizontalCenter ? 'center' : 'flex-start',
      marginLeft: margin,
      marginRight: margin
    }
  })

const Container = ({
  children,
  verticalCenter = false,
  horizontalCenter = false,
  margin = 0
}: Props) => {
  const styles = createStyle(verticalCenter, horizontalCenter, margin)

  return <View style={styles.container}>{children}</View>
}

export default Container
