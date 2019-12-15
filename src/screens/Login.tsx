import React from 'react'
import { View, StyleSheet, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import { Header, Input, Button } from 'react-native-elements'
import { useNavigation } from 'react-navigation-hooks'
import Container from '@/components/Container'

import { useFormik } from 'formik'
import { loginSchema } from '@/utils/validation'
import { useStore } from 'effector-react'
import { store } from '@/store'
import { Login, UpdateUser } from '@/store/events'
import { login, loggedInUser } from '@/utils/api'

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    height: 200,
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
    backgroundColor: '#0984e3'
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
  const { noticeToken } = useStore(store)
  const { navigate, state, goBack } = useNavigation()

  const {
    values,
    errors,
    isSubmitting,
    handleBlur,
    handleChange,
    submitForm
  } = useFormik({
    initialValues: {
      // email: 'hoge@gmail.com',
      // password: 'secret'
      email: 'takashi2@gmail.com',
      password: 'secret'
    },
    validationSchema: loginSchema,
    onSubmit: async ({
      email,
      password
    }) => {
      const loginResult = await login({ email, password }, noticeToken)
      if (loginResult.ok === true) {
        Login({ token: loginResult.data.token })

        await AsyncStorage.setItem('token', loginResult.data.token)
        const loggedInResult = await loggedInUser()

        if (loggedInResult.ok === true) {
          UpdateUser({ user: loggedInResult.data })
        }

        navigate('AfterLogin')
      }
    }
  })

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      behavior='padding'
    >
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
        <View style={styles.innerContainer}>
          <Input
            placeholder='メールアドレス'
            leftIcon={{
              type: 'feather',
              name: 'mail'
            }}
            value={values.email}
            errorMessage={errors.email}
            onChangeText={handleChange('email') as any}
            onBlur={handleBlur('email') as any}
            inputStyle={styles.input}
          />
          <Input
            secureTextEntry={true}
            placeholder='パスワード'
            leftIcon={{
              type: 'feather',
              name: 'lock'
            }}
            value={values.password}
            errorMessage={errors.password}
            onChangeText={handleChange('password') as any}
            onBlur={handleBlur('password') as any}
            inputStyle={styles.input}
          />
          <Button
            title='ログイン'
            loading={isSubmitting}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            onPress={submitForm}
          />
        </View>
      </Container>
    </KeyboardAvoidingView>
  )
}
