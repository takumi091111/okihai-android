import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Header } from 'react-native-elements'
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
  const { state, navigate } = useNavigation()

  const handlePressBrowseButton = () => {
    navigate('ProfileBrowse')
  }

  const handlePressEditButton = () => {
    navigate('ProfileEdit')
  }

  return (
    <>
      <Header
        centerComponent={{
          text: state.params.title
        }}
        rightComponent={{
          type: 'feather',
          icon: 'log-out',
          color: '#ff7675',
          onPress: () => navigate('Logout')
        }}
      />
      <Container isCenter={true}>
        <View style={styles.innerContainer}>
          <Button
            title='閲覧'
            icon={{
              type: 'feather',
              name: 'log-in',
              color: 'white'
            }}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.loginButton}
            titleStyle={styles.buttonTitle}
            iconContainerStyle={styles.icon}
            onPress={handlePressBrowseButton}
          />
          <Button
            title='編集'
            icon={{
              type: 'feather',
              name: 'edit',
              color: 'white'
            }}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.registerButton}
            titleStyle={styles.buttonTitle}
            iconContainerStyle={styles.icon}
            onPress={handlePressEditButton}
          />
        </View>
      </Container>
    </>
  )
}

export default LoginOrRegister
