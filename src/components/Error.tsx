import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'

import Row from '@/components/Row'
import { COLOR } from '@/utils/theme/colors'

interface Props {
  active: boolean
  text?: string
  onRetry?: () => void
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    alignItems: 'center'
  },
  text: {
    alignItems: 'center',
    paddingBottom: 30
  }
})

const Error = ({ active, text, onRetry }: Props) => {
  if (!active) return null
  return (
    <View style={styles.container}>
      <Row style={styles.icon}>
        <Icon name="x" size={48} color={COLOR.RED} />
      </Row>
      {text ? (
        <Row style={styles.text}>
          <Text h4>{text}</Text>
        </Row>
      ) : null}
      {onRetry ? <Button title="再試行" onPress={onRetry} /> : null}
    </View>
  )
}

export default Error
