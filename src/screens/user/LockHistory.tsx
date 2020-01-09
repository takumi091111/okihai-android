import React, { useCallback, useMemo, useState } from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import {
  useFocusEffect,
  useNavigation,
  useNavigationParam
} from 'react-navigation-hooks'

import Empty from '@/components/Empty'
import Error from '@/components/Error'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import LockHistoryListItem from '@/components/LockHistoryListItem'
import { Log } from '@/interfaces/Log'
import { logList } from '@/utils/api/common'

const LockHistory = () => {
  const title: string = useNavigationParam('title')
  const { navigate } = useNavigation()
  const [logs, setLogs] = useState<Log[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isRefresh, setIsRefresh] = useState(false)
  const isEmpty = useMemo(() => logs.length <= 0, [logs])

  const scrollViewStyle = useMemo(() => {
    if (isLoading || isError || isEmpty) {
      return {
        flex: 1
      }
    }
    return null
  }, [isLoading, isError, isEmpty])

  const handlePressLogout = () => navigate('Logout')

  const handlePressListItem = (log: Log) =>
    navigate('LockHistoryDetail', { log })

  const handleRefresh = () => {
    setIsRefresh(true)
    fetchLogList()
  }

  const fetchLogList = async () => {
    setIsError(false)
    setIsLoading(true)

    const result = await logList()
    if (result.ok === true) {
      setLogs(result.data)
    } else {
      setIsError(true)
    }

    setIsLoading(false)
    setIsRefresh(false)
  }

  useFocusEffect(
    useCallback(() => {
      fetchLogList()
      return () => null
    }, [])
  )

  return (
    <>
      <Header title={title} onPressLogout={handlePressLogout} />
      <ScrollView
        contentContainerStyle={scrollViewStyle}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={handleRefresh} />
        }
      >
        {isError ? (
          <Error
            active={isError}
            text="開閉履歴の取得に失敗しました"
            onRetry={fetchLogList}
          />
        ) : isLoading ? (
          <Loading active={isLoading} text="確認中..." />
        ) : isEmpty ? (
          <Empty active={isEmpty} text="開閉履歴が0件です" />
        ) : (
          logs.map(log => (
            <LockHistoryListItem
              key={log.id}
              log={log}
              onPress={handlePressListItem}
            />
          ))
        )}
      </ScrollView>
    </>
  )
}

export default LockHistory
