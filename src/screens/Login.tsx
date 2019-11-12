import React from 'react'
import { StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { NavigationContainerProps, withNavigation } from 'react-navigation'
import * as yup from 'yup'
import { useFormik } from 'formik'
import Container from '@/components/Container'
import { login } from '@/utils/api'

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
  const {
    values,
    errors,
    isSubmitting,
    handleBlur,
    handleChange,
    submitForm
  } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      email: yup.string()
        .email('有効なメールアドレスを入力してください')
        .required('有効なメールアドレスを入力してください'),
      password: yup.string()
        .required('有効なパスワードを入力してください')
    }),
    onSubmit: async ({ email, password }) => {
      const json = await login(email, password)
      console.log(json)
      navigation.navigate('Home')
    }
  })

  return (
    <Container isCenter>
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
        containerStyle={styles.inputContainer}
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
        containerStyle={styles.inputContainer}
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
    </Container>
  )
}

export default withNavigation(Login)
