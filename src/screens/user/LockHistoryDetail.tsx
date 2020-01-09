import React from 'react'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'

import Header from '@/components/Header'
import LockHistoryDetailForm from '@/components/LockHistoryDetailForm'
import { Log } from '@/interfaces/Log'

const LockHistoryDetail = () => {
  const title: string = useNavigationParam('title')
  const log: Log = useNavigationParam('log')
  const { goBack } = useNavigation()

  const handlePressBack = () => goBack()

  return (
    <>
      <Header title={title} onPressBack={handlePressBack} />
      <LockHistoryDetailForm log={log} />
    </>
  )
}

export default LockHistoryDetail
