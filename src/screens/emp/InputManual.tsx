import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'

import Header from '@/components/Header'
import ManualInputForm, { InputValue } from '@/components/ManualInputForm'
import { lockStatus } from '@/utils/api/common'

const InputManual = () => {
  const title: string = useNavigationParam('title')
  const { navigate, goBack } = useNavigation()

  const fetchLockStatus = async ({ device_id }: InputValue) => {
    const result = await lockStatus(device_id)
    if (result.ok === false) {
      navigate('Error')
      return null
    }
    return result
  }

  const handlePressBack = () => goBack()

  const handleSubmit = async ({ device_id }: InputValue) => {
    const result = await fetchLockStatus({ device_id })
    if (!result) return
    const { is_locked } = result.data
    navigate('Lock', { device_id, is_locked })
  }

  return (
    <>
      <Header title={title} onPressBack={handlePressBack} />
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <ManualInputForm onSubmit={handleSubmit} />
      </KeyboardAwareScrollView>
    </>
  )
}

export default InputManual
