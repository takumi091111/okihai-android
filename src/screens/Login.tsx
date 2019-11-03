import React, { useEffect } from 'react'
import { StyleSheet, BackHandler } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { NavigationContainerProps, withNavigation } from 'react-navigation'
import * as yup from 'yup'
import { Formik } from 'formik'
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

interface FormValues {
  email?: string
  password?: string
}

const initialValues: FormValues = {
  email: '',
  password: ''
}

const login = async (values: FormValues) => {
  console.log('処理中', values)
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('完了')
      resolve(true)
    }, 1000)
  })
}

const Login = ({ navigation }: NavigationContainerProps) => {
  useBackButton(() => {
    console.log('back button pressed')
    return () => null
  })

  const validationSchema = yup.object().shape({
    email: yup.string()
      .email('有効なメールアドレスを入力してください')
      .required('有効なメールアドレスを入力してください'),
    password: yup.string()
      .required('有効なパスワードを入力してください')
  })

  const handleSubmit = async (values: FormValues) => {
    await login(values)
    navigation.navigate('Home')
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isSubmitting
      }) => (
        <Container isCenter>
          <Input
            placeholder='メールアドレス'
            leftIcon={{
              type: 'feather',
              name: 'mail'
            }}
            value={values.email}
            errorMessage={errors.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Input
            placeholder='パスワード'
            leftIcon={{
              type: 'feather',
              name: 'lock'
            }}
            value={values.password}
            errorMessage={errors.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Button
            title='ログイン'
            loading={isSubmitting}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            onPress={handleSubmit as any}
          />
        </Container>
      )}
    </Formik>
  )
}

export default withNavigation(Login)
