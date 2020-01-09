import { diff } from 'deep-object-diff'
import { useStore } from 'effector-react'
import React, { useMemo, useState } from 'react'
import { ToastAndroid } from 'react-native'
import { ButtonGroup } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'

import Header from '@/components/Header'
import { EmployeeProfileForm } from '@/components/ProfileForm'
import Row from '@/components/Row'
import { UpdateEmployee } from '@/effector/events'
import { loggedInEmployee as store } from '@/effector/stores/loggedIn'
import { Employee } from '@/interfaces/Employee'
import { UpdateInput } from '@/interfaces/FormInput'
import { update } from '@/utils/api/emp'

const Profile = () => {
  const emp = useStore(store)
  const { navigate } = useNavigation()
  const title: string = useNavigationParam('title')
  const [index, setIndex] = useState(0)
  const isEditable = useMemo(() => index === 1, [index])

  const handlePressLogout = () => navigate('Logout')

  const handlePressButtonGroup = (selectedIndex: number) => {
    setIndex(selectedIndex)
  }

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

    const updatedEmployee = result.data
    UpdateEmployee(updatedEmployee)
    ToastAndroid.show('編集が完了しました', ToastAndroid.SHORT)
  }

  return (
    <>
      <Header title={title} onPressLogout={handlePressLogout} />
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={150}>
        {emp.is_admin ? (
          <Row>
            <ButtonGroup
              selectedIndex={index}
              buttons={['閲覧', '編集']}
              onPress={handlePressButtonGroup}
            />
          </Row>
        ) : null}
        <EmployeeProfileForm
          emp={emp}
          editable={isEditable}
          onSubmit={postUpdate}
        />
      </KeyboardAwareScrollView>
    </>
  )
}

export default Profile
