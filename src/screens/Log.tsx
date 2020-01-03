import React, { useState, useCallback, useMemo } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { Header, ListItem, Text } from 'react-native-elements'
import { useNavigation, useFocusEffect } from 'react-navigation-hooks'
import dayjs from 'dayjs'
import 'dayjs/locale/es' 
import Container from '@/components/Container'
import { logList } from '@/utils/api'
import { Log } from '@/interfaces/Log'

const styles = StyleSheet.create({
  listItem: {
    borderLeftWidth: 5
  },
  open: {
    borderColor: '#00b894'
  },
  close: {
    borderColor: '#ff7675'
  }
})

export default () => {
  const { state, navigate } = useNavigation()
  const [logs, setLogs] = useState([] as Log[])
  const [isLoading, setIsLoading] = useState(false)

  const isEmpty = useMemo(() => logs.length <= 0, [logs])

  const handlePressListItem = (log: Log) => () => {
    navigate('LogDetail', { log })
  }

  useFocusEffect(useCallback(() => {
    const f = async () => {
      setIsLoading(true)
      const result = await logList()
      if (result.ok === true) {
        setLogs(result.data)
      }
      setIsLoading(false)
    }
    f()
    return () => null
  }, []))

  return (
    <>
      <Header
        centerComponent={{
          text: state.params.title
        }}
        rightComponent={{
          type: 'feather',
          icon: 'log-out',
          color: '#ff7675',
          onPress: () => navigate('Logout')
        }}
      />
      <Container isCenter={isLoading || isEmpty}>
        { isLoading ?
          <ActivityIndicator
            size='large'
            color='#000000'
          /> :
          isEmpty ?
          <Text h4>ログデータが0件です</Text> :
          logs.map((log) => {
            const style = {
              ...styles.listItem,
              ...styles[log.operation]
            }
            const operator = log.employee_id === null ? 'ユーザー' : '配達員'
            const lockStatus = log.operation === 'open' ? '解錠' : '施錠'
            const title = `${lockStatus} / ${operator}`
            return (
              <ListItem key={log.id}
                leftIcon={{
                  type: 'feather',
                  name: log.operation === 'open' ? 'unlock' : 'lock'
                }}
                title={title}
                subtitle={dayjs(log.created_at).format('YYYY年MM月DD日 HH時mm分')}
                chevron={{ color: '#8e8e93', size: 30 }}
                containerStyle={style}
                bottomDivider={true}
                onPress={handlePressListItem(log)}
              />
            )
          })
        }
      </Container>
    </>
  )
}
