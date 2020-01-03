import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Header, Input, Button } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from 'react-navigation-hooks'

import { useFormik } from 'formik'
import { registerSchema } from '@/utils/validation'
import { Login, UpdateUser } from '@/store/events'
import { register } from '@/utils/api'
import { ErrorMessageString } from '@/interfaces/Data'

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    height: 400,
    justifyContent: 'space-between',
    alignItems: 'center'
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
      device_id: ''
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
          const errors = result.data.errors as ErrorMessageString
          setErrors({
            name: errors['name'] || '',
            address: errors['address'] || '',
            email: errors['email'] || '',
            password: errors['password'] || '',
            device_id: errors['device_id'] || ''
          })
        }
      }
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
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={{
          paddingTop: 70
        }}
        extraScrollHeight={60}
      >
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
      </KeyboardAwareScrollView>
    </>
  )
}
