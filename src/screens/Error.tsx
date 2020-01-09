import { useStore } from 'effector-react'
import React from 'react'
import { useNavigation } from 'react-navigation-hooks'

import ErrorDialog from '@/components/ErrorDialog'
import { errorDialog as store } from '@/effector/stores/errorDialog'

const Error = () => {
  const { goBack } = useNavigation()
  const errorDialog = useStore(store)
  const handleButtonPress = () => goBack()

  return (
    <ErrorDialog
      title={errorDialog.title}
      message={errorDialog.message}
      onButtonPress={handleButtonPress}
    />
  )
}

export default Error
