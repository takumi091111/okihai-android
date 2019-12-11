import React, { useState } from 'react'
import Toast from 'react-native-root-toast'
import { Header, ListItem, Icon } from 'react-native-elements'
import { FloatingAction } from 'react-native-floating-action'
import { useNavigation } from 'react-navigation-hooks'
import { DateTimeFormat } from 'intl'
import 'intl/locale-data/jsonp/ja'
import Container from '@/components/Container'

enum LOCK_STATUS {
  OPEN = 0,
  CLOSE = 1
}

interface LogItem {
  status: LOCK_STATUS
  createdAt: string
}

const items: LogItem[] = [
  {
    status: LOCK_STATUS.OPEN,
    createdAt: (new Date()).toDateString()
  },
  {
    status: LOCK_STATUS.CLOSE,
    createdAt: (new Date()).toDateString()
  },
  {
    status: LOCK_STATUS.OPEN,
    createdAt: (new Date()).toDateString()
  }
]

const Log = () => {
  const { state, navigate } = useNavigation()
  const [isVisible, setIsVisible] = useState(false)
  const texts = ['解錠', '施錠']
  const icons = ['unlock', 'lock']

  const handlePressClearButton = () => {
    setIsVisible(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 1000)
  }

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
      <Container>
        { items.map((item, i) => (
          <ListItem key={i}
            leftIcon={{
              type: 'feather',
              name: icons[item.status]
            }}
            title={texts[item.status]}
            subtitle={DateTimeFormat('ja-JP').format(Date.parse(item.createdAt))}
            bottomDivider={true}
          />
        )) }
        <FloatingAction
          color='#ff7675'
          onPressMain={handlePressClearButton}
          showBackground={false}
          floatingIcon={
            <Icon
              type='feather'
              name='trash'
              color='#ffffff'
            />
          }
        />
        <Toast
          visible={isVisible}
          shadow={false}
        >
          履歴を削除しました
        </Toast>
      </Container>
    </>
  )
}

export default Log
