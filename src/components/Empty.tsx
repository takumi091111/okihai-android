import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import Row from '@/components/Row'

interface Props {
  active: boolean
  text?: string
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

const Empty = ({ active, text }: Props) => {
  if (!active) return null
  return (
    <View style={styles.container}>
      <Row style={styles.icon}>
        <Icon name="frown-o" size={48} />
      </Row>
      {text ? (
        <Row style={styles.text}>
          <Text h4>{text}</Text>
        </Row>
      ) : null}
    </View>
  )
}

export default Empty
