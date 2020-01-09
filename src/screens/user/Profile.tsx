import { diff } from 'deep-object-diff'
import { useStore } from 'effector-react'
import React, { useMemo, useState } from 'react'
import { ToastAndroid } from 'react-native'
import { ButtonGroup } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'

import Header from '@/components/Header'
import { UserProfileForm } from '@/components/ProfileForm'
import Row from '@/components/Row'
import { UpdateUser } from '@/effector/events'
import { loggedInUser } from '@/effector/stores/loggedIn'
import { UpdateInput } from '@/interfaces/FormInput'
import { User } from '@/interfaces/User'
import { update } from '@/utils/api/user'

const Profile = () => {
  const user = useStore(loggedInUser)
  const title: string = useNavigationParam('title')
  const { navigate } = useNavigation()
  const [index, setIndex] = useState(0)
  const isEditable = useMemo(() => index === 1, [index])

  const handlePressLogout = () => navigate('Logout')
  const handlePressButtonGroup = (selectedIndex: number) => {
    setIndex(selectedIndex)
  }

  const postUpdate = async (
    inputValues: UpdateInput<User>,
    setErrors: (errors: any) => void
  ) => {
    const diffValues = diff(
      {
        name: user.name,
        address: user.address,
        email: user.email,
        password: user.password
      },
      {
        ...inputValues
      }
    )

    const result = await update(diffValues)

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

    const updatedUser = result.data
    UpdateUser(updatedUser)
    ToastAndroid.show('編集が完了しました', ToastAndroid.SHORT)

    return true
  }

  return (
    <>
      <Header title={title} onPressLogout={handlePressLogout} />
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={150}>
        <Row>
          <ButtonGroup
            selectedIndex={index}
            buttons={['閲覧', '編集']}
            onPress={handlePressButtonGroup}
          />
        </Row>
        <UserProfileForm
          user={user}
          editable={isEditable}
          onSubmit={postUpdate}
        />
      </KeyboardAwareScrollView>
    </>
  )
}

export default Profile
