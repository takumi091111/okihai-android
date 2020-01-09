import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'

import Row from '@/components/Row'
import { COLOR } from '@/utils/theme/colors'

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
  center: {
    alignItems: 'center'
  }
})

const Loading = ({ active, text }: Props) => {
  if (!active) return null
  return (
    <View style={styles.container}>
      <Row style={styles.center}>
        <Icon name="loader" size={48} color={COLOR.GRAY} />
      </Row>
      {text ? (
        <Row style={styles.center}>
          <Text h3>{text}</Text>
        </Row>
      ) : null}
    </View>
  )
}

export default Loading
