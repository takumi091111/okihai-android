import React, { useState, useCallback } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { Header, Input } from 'react-native-elements'
import { useNavigation, useFocusEffect } from 'react-navigation-hooks'

import Container from '@/components/Container'
import { getLoggedInUser } from '@/store/actions'

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50
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
    backgroundColor: '#00b894'
  },
  buttonTitle: {
    color: 'white'
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalHeadingText: {
    fontSize: 20
  },
  modalButtonContainer: {
    width: '100%'
  }
})

const Profile = () => {
  const { state, goBack } = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [values, setValues] = useState({
    name: '',
    address: '',
    email: '',
    device_id: ''
  })

  useFocusEffect(useCallback(() => {
    const f = async () => {
      setIsLoading(true)
      const { state } = await getLoggedInUser()
      const { name, address, email, device_id } = state
      setValues({
        name,
        address,
        email,
        device_id
      })
      setIsLoading(false)
    }
    f()
    return () => null
  }, []))

  return (
    <>
      <Header
        centerComponent={{
          text: state.params.title
        }}
        leftComponent={{
          type: 'feather',
          icon: 'arrow-left',
          onPress: () => goBack()
        }}
      />
      <Container isCenter={true}>
        { isLoading ? 
          <ActivityIndicator
            size='large'
            color='#000000'
          /> :
          <View style={styles.innerContainer}>
            <Input
              label='名前'
              placeholder='名前'
              leftIcon={{
                type: 'feather',
                name: 'user'
              }}
              value={values.name}
              inputStyle={styles.input}
              editable={false}
            />
            <Input
              label='住所'
              placeholder='住所'
              leftIcon={{
                type: 'feather',
                name: 'home'
              }}
              value={values.address}
              inputStyle={styles.input}
              editable={false}
            />
            <Input
              label='メールアドレス'
              placeholder='メールアドレス'
              leftIcon={{
                type: 'feather',
                name: 'mail'
              }}
              value={values.email}
              inputStyle={styles.input}
              editable={false}
            />
            <Input
              label='箱ID'
              placeholder='箱ID'
              leftIcon={{
                type: 'feather',
                name: 'box'
              }}
              value={values.device_id}
              inputStyle={styles.input}
              editable={false}
            />
          </View>
        }
      </Container>
    </>
  )
}

export default Profile
