import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-elements'

import Row from '@/components/Row'
import { ErrorDialog as _ErrorDialog } from '@/interfaces/State'

interface _Props {
  onButtonPress: () => void
}

type Props = _ErrorDialog & _Props

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '80%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10
  },
  center: {
    alignItems: 'center'
  },
  message: {
    fontSize: 16
  }
})

const ErrorDialog = ({ title, message, onButtonPress }: Props) => (
  <View style={styles.background}>
    <View style={styles.container}>
      <Row style={styles.center}>
        <Text h3>{title}</Text>
      </Row>
      <Row style={styles.center}>
        <Text style={styles.message}>{message}</Text>
      </Row>
      <Row>
        <Button title="OK" onPress={onButtonPress} />
      </Row>
    </View>
  </View>
)

export default ErrorDialog
