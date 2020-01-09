import React from 'react'
import { ToastAndroid } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'

import Header from '@/components/Header'
import LoginForm from '@/components/LoginForm'
import Row from '@/components/Row'
import Title from '@/components/Title'
import { updateTokenInAsyncStorage } from '@/effector/effects'
import { Login as LoginEvent, UpdateEmployee } from '@/effector/events'
import { LoginInput } from '@/interfaces/FormInput'
import { loggedIn, login } from '@/utils/api/emp'

const Login = () => {
  const title: string = useNavigationParam('title')
  const { goBack, navigate } = useNavigation()

  const postLogin = async (inputValues: LoginInput) => {
    const loginResult = await login(inputValues)
    if (loginResult.ok === false) {
      navigate('Error')
      return false
    }
    const { token } = loginResult.data
    LoginEvent(token)
    updateTokenInAsyncStorage(token)
    return true
  }

  const fetchLoggedIn = async () => {
    const loggedInResult = await loggedIn()
    if (loggedInResult.ok === false) {
      navigate('Error')
      return false
    }
    const emp = loggedInResult.data
    UpdateEmployee(emp)
    return true
  }

  const handlePressBack = () => goBack()
  const handleSubmit = async (inputValues: LoginInput) => {
    const isLoginSuccess = await postLogin(inputValues)
    if (!isLoginSuccess) return

    const isLoggedInSuccess = await fetchLoggedIn()
    if (!isLoggedInSuccess) return

    navigate('LoggedIn')
    ToastAndroid.show('ログインしました', ToastAndroid.SHORT)
  }

  return (
    <>
      <Header title={title} onPressBack={handlePressBack} />
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <Row>
          <Title text="ログイン" />
        </Row>
        <LoginForm onSubmit={handleSubmit} />
      </KeyboardAwareScrollView>
    </>
  )
}

export default Login
