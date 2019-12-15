import React from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Header, Input, Button } from 'react-native-elements'
import { useNavigation } from 'react-navigation-hooks'
import Container from '@/components/Container'

import { useFormik } from 'formik'
import { registerSchema } from '@/utils/validation'
import { Login, UpdateUser } from '@/store/events'
import { register } from '@/utils/api'

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    height: 400,
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
      name: '',
      address: '',
      email: '',
      password: '',
      device_id: '0000-0000-0000-0000'
    },
    validationSchema: registerSchema,
    onSubmit: async (user, { setErrors }) => {
      const result = await register(user)

      if (result.ok === true) {
        Login({ token: result.data.token })
        UpdateUser({ user: result.data.user })
        navigate('AfterLogin')
      } else {
        if (result.statusCode === 422) {
          setErrors({
            name: result.error['name'] || '',
            address: result.error['address'] || '',
            email: result.error['email'] || '',
            password: result.error['password'] || '',
            device_id: result.error['device_id'] || ''
          })
        }
      }
    }
  })

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      behavior='position'
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
            placeholder='名前'
            leftIcon={{
              type: 'feather',
              name: 'user'
            }}
            value={values.name}
            errorMessage={errors.name}
            onChangeText={handleChange('name') as any}
            onBlur={handleBlur('name') as any}
            inputStyle={styles.input}
            textContentType='name'
          />
          <Input
            placeholder='住所'
            leftIcon={{
              type: 'feather',
              name: 'home'
            }}
            value={values.address}
            errorMessage={errors.address}
            onChangeText={handleChange('address') as any}
            onBlur={handleBlur('address') as any}
            inputStyle={styles.input}
            textContentType='fullStreetAddress'
          />
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
            keyboardType='ascii-capable'
            textContentType='emailAddress'
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
            keyboardType='ascii-capable'
            textContentType='password'
          />
          <Input
            placeholder='置き配ボックスID'
            leftIcon={{
              type: 'feather',
              name: 'box'
            }}
            value={values.device_id}
            errorMessage={errors.device_id}
            onChangeText={handleChange('device_id') as any}
            onBlur={handleBlur('device_id') as any}
            inputStyle={styles.input}
            keyboardType='number-pad'
          />
          <Button
            title='登録'
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
