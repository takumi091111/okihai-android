import React, { useEffect } from 'react'
import { StyleSheet, BackHandler } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { NavigationContainerProps, withNavigation } from 'react-navigation'
import Container from '@/components/Container'

const useBackButton = (handler: () => void) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler)

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handler
      )
    }
  }, [])
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingBottom: 50
  },
  input: {
    paddingLeft: 15
  },
  buttonContainer: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10
  },
  button: {
    backgroundColor: '#0984e3'
  },
  buttonTitle: {
    color: 'white'
  }
})

const Login = ({ navigation }: NavigationContainerProps) => {
  useBackButton(() => {
    console.log('back button pressed')
    return () => null
  })
  return (
    <Container isCenter>
      <Input
        placeholder='メールアドレス'
        leftIcon={{
          type: 'feather',
          name: 'mail'
        }}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <Input
        placeholder='パスワード'
        leftIcon={{
          type: 'feather',
          name: 'lock'
        }}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <Button
        title='ログイン'
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        onPress={() => navigation.navigate('Home')}
      />
    </Container>
  )
}

export default withNavigation(Login)
