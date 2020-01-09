import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'

import { COLOR } from '@/utils/theme/colors'

interface Props {
  text: string
}

const styles = StyleSheet.create({
  title: {
    color: COLOR.DEEP_RED,
    paddingLeft: 10,
    paddingRight: 10
  }
})

const Title = ({ text }: Props) => (
  <Text h3 style={styles.title}>
    {text}
  </Text>
)

export default Title
