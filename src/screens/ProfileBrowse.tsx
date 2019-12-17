import React, { useState, useCallback } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { Header, Input } from 'react-native-elements'
import { useNavigation, useFocusEffect } from 'react-navigation-hooks'
import Container from '@/components/Container'
import { useStore } from 'effector-react'
import { store } from '@/store'

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    height: 350,
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

export default () => {
  const { user } = useStore(store)
  const { state, goBack } = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [values, setValues] = useState({
    id: 0,
    name: '',
    address: '',
    email: '',
    device_id: ''
  })

  useFocusEffect(useCallback(() => {
    const f = async () => {
      setIsLoading(true)
      setValues({
        id: user.id,
        name: user.name,
        address: user.address,
        email: user.email,
        device_id: user.device_id
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
              label='ユーザID'
              placeholder='ユーザID'
              leftIcon={{
                type: 'feather',
                name: 'tag'
              }}
              value={values.id.toString()}
              inputStyle={styles.input}
              editable={false}
            />
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
