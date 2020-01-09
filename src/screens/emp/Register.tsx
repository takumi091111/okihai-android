import React from 'react'
import { ToastAndroid } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'

import Header from '@/components/Header'
import { EmployeeRegisterForm } from '@/components/RegisterForm'
import Row from '@/components/Row'
import Title from '@/components/Title'
import { Employee } from '@/interfaces/Employee'
import { RegisterInput } from '@/interfaces/FormInput'
import { register } from '@/utils/api/emp'

const Register = () => {
  const title: string = useNavigationParam('title')
  const { goBack, navigate } = useNavigation()
  const handlePressBack = () => goBack()

  const postRegister = async (
    inputValues: RegisterInput<Employee>,
    setErrors: (errors: any) => void
  ) => {
    const result = await register(inputValues)

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

    ToastAndroid.show('登録が完了しました', ToastAndroid.SHORT)
    return true
  }

  return (
    <>
      <Header title={title} onPressBack={handlePressBack} />
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={150}>
        <Row>
          <Title text="新規登録" />
        </Row>
        <EmployeeRegisterForm onSubmit={postRegister} />
      </KeyboardAwareScrollView>
    </>
  )
}

export default Register
