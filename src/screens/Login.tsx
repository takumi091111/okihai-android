import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Header, Input, Button, Overlay, Text } from 'react-native-elements'
import { useNavigation } from 'react-navigation-hooks'

import * as yup from 'yup'
import { useFormik } from 'formik'

import Container from '@/components/Container'
import { login } from '@/store/actions'

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

const Login = () => {
  const { navigate, state, goBack } = useNavigation()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const {
    values,
    errors,
    isSubmitting,
    handleBlur,
    handleChange,
    submitForm
  } = useFormik({
    initialValues: {
      email: 'hoge@gmail.com',
      password: 'secret'
    },
    validationSchema: yup.object().shape({
      email: yup.string()
        .email('有効なメールアドレスを入力してください')
        .required('有効なメールアドレスを入力してください'),
      password: yup.string()
        .required('有効なパスワードを入力してください')
    }),
    onSubmit: async ({
      email,
      password
    }) => {
      const payload = await login(email, password)
      // if (payload.state === null) {
      //   setIsModalVisible(true)
      //   return
      // }
      navigate('AfterLogin')
    }
  })

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
        <Overlay
          isVisible={isModalVisible}
          width='80%'
          height={150}
          animated={true}
          animationType='fade'
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeadingText}>ログインに失敗</Text>
            <Text>メールアドレスまたはパスワードが正しくありません</Text>
            <Button
              title='OK'
              containerStyle={styles.modalButtonContainer}
              onPress={() => setIsModalVisible(false)}
            />
          </View>
        </Overlay>
      </Container>
    </>
  )
}

export default Login
