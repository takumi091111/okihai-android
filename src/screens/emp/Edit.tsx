import { diff } from 'deep-object-diff'
import React from 'react'
import { ToastAndroid } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'

import Header from '@/components/Header'
import { EmployeeProfileForm } from '@/components/ProfileForm'
import { Employee } from '@/interfaces/Employee'
import { UpdateInput } from '@/interfaces/FormInput'
import { update } from '@/utils/api/emp'

const Profile = () => {
  const title: string = useNavigationParam('title')
  const emp: Employee = useNavigationParam('emp')
  const { goBack, navigate } = useNavigation()

  const handlePressBack = () => goBack()

  const postUpdate = async (
    inputValues: UpdateInput<Employee>,
    setErrors: (errors: any) => void
  ) => {
    const diffValues = diff(
      {
        email: emp.email,
        password: emp.password,
        is_admin: emp.is_admin
      },
      {
        ...inputValues
      }
    )

    const result = await update(emp.id, {
      name: emp.name,
      ...diffValues
    })

    if (result.ok === false) {
      if (result.statusCode === 401) {
        navigate('Error')
      }
      if (result.statusCode === 422) {
        setErrors(result.data.errors)
        ToastAndroid.show('編集に失敗しました', ToastAndroid.SHORT)
      }
      return false
    }

    ToastAndroid.show('編集が完了しました', ToastAndroid.SHORT)
    return true
  }

  return (
    <>
      <Header title={title} onPressBack={handlePressBack} />
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={150}>
        <EmployeeProfileForm emp={emp} editable={true} onSubmit={postUpdate} />
      </KeyboardAwareScrollView>
    </>
  )
}

export default Profile
