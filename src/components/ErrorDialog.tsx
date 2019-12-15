import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Overlay, Text, Button } from 'react-native-elements'
import { ErrorDialogState } from '@interfaces/ErrorDialogState'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headingText: {
    fontSize: 20
  },
  buttonContainer: {
    width: '100%'
  }
})

type Props = ErrorDialogState & {
  onPressButton?: () => void
}

const ErrorDialog = ({
  title = '',
  message = '',
  isVisible = false,
  onPressButton
}: Props) => {
  return (
    <Overlay
      isVisible={isVisible}
      width='80%'
      height={150}
      animated={true}
      animationType='fade'
    >
      <View style={styles.container}>
        <Text style={styles.headingText}>{ title }</Text>
        <Text>{ message }</Text>
        <Button
          title='OK'
          containerStyle={styles.buttonContainer}
          onPress={onPressButton}
        />
      </View>
    </Overlay>
  )
}

export default ErrorDialog
