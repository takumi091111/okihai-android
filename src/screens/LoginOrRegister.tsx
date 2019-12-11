import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from 'react-navigation-hooks'
import Container from '@/components/Container'

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    height: 120,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonContainer: {
    width: '80%',
    paddingLeft: 10,
    paddingRight: 10
  },
  buttonTitle: {
    color: 'white'
  },
  loginButton: {
    backgroundColor: '#0984e3'
  },
  registerButton: {
    backgroundColor: '#00b894'
  },
  icon: {
    paddingRight: 30,
    marginLeft: -15
  }
})

const LoginOrRegister = () => {
  const { navigate } = useNavigation()

  const handlePressLoginButton = () => {
    navigate('Login')
  }

  const handlePressRegisterButton = () => {
    navigate('Register')
  }

  return (
    <Container isCenter={true}>
      <View style={styles.innerContainer}>
        <Button
          title='ログイン'
          icon={{
            type: 'feather',
            name: 'log-in',
            color: 'white'
          }}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.loginButton}
          titleStyle={styles.buttonTitle}
          iconContainerStyle={styles.icon}
          onPress={handlePressLoginButton}
        />
        <Button
          title='新規登録'
          icon={{
            type: 'feather',
            name: 'edit',
            color: 'white'
          }}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.registerButton}
          titleStyle={styles.buttonTitle}
          iconContainerStyle={styles.icon}
          onPress={handlePressRegisterButton}
        />
      </View>
    </Container>
  )
}

export default LoginOrRegister
