import { useStore } from 'effector-react'
import React from 'react'
import { ToastAndroid } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'

import Header from '@/components/Header'
import { UserRegisterForm } from '@/components/RegisterForm'
import Row from '@/components/Row'
import Title from '@/components/Title'
import { updateTokenInAsyncStorage } from '@/effector/effects'
import { Login, UpdateUser } from '@/effector/events'
import { noticeToken as store } from '@/effector/stores/noticeToken'
import { RegisterInput } from '@/interfaces/FormInput'
import { User } from '@/interfaces/User'
import { register } from '@/utils/api/user'

const Register = () => {
  const noticeToken = useStore(store)
  const title: string = useNavigationParam('title')
  const { goBack, navigate } = useNavigation()
  const handlePressBack = () => goBack()

  const postRegister = async (
    inputValues: RegisterInput<User>,
    setErrors: (errors: any) => void
  ) => {
    const result = await register({ ...inputValues, noticeToken })

    if (result.ok === false) {
      if (result.statusCode === 400) {
        navigate('Error')
      }
      if (result.statusCode === 422) {
        setErrors(result.data.errors)
        ToastAndroid.show('登録に失敗しました', ToastAndroid.SHORT)
      }
      return false
    }

    const { user, token } = result.data
    Login(token)
    updateTokenInAsyncStorage(token)
    UpdateUser(user)
    navigate('LoggedIn')
    ToastAndroid.show('登録が完了しました', ToastAndroid.SHORT)

    return true
  }

  return (
    <>
      <Header title={title} onPressBack={handlePressBack} />
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={170}>
        <Row>
          <Title text="新規登録" />
        </Row>
        <UserRegisterForm onSubmit={postRegister} />
      </KeyboardAwareScrollView>
    </>
  )
}

export default Register
