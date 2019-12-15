import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Header, Input } from 'react-native-elements'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import Container from '@/components/Container'
import dayjs from 'dayjs'
import { Log } from '@/interfaces/Log'

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50
  },
  input: {
    paddingLeft: 15
  },
  buttonContainer: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10
  },
  button: {
    backgroundColor: '#00b894'
  },
  buttonTitle: {
    color: 'white'
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalHeadingText: {
    fontSize: 20
  },
  modalButtonContainer: {
    width: '100%'
  }
})

export default () => {
  const { state, goBack } = useNavigation()
  const log = useNavigationParam('log') as Log

  const formatEmpId = (employee_id: number | null) => {
    if (employee_id === null) return ''
    return employee_id.toString()
  }

  return (
    <>
      <Header
        centerComponent={{
          text: state.params.title
        }}
        leftComponent={{
          type: 'feather',
          icon: 'arrow-left',
          onPress: () => goBack()
        }}
      />
      <Container isCenter={true}>
        <View style={styles.innerContainer}>
          <Input
            label='ログID'
            placeholder='ログID'
            leftIcon={{
              type: 'feather',
              name: 'edit'
            }}
            value={log.id.toString()}
            inputStyle={styles.input}
            editable={false}
          />
          <Input
            label='配達員'
            placeholder='配達員'
            leftIcon={{
              type: 'feather',
              name: 'user'
            }}
            value={formatEmpId(log.employee_id)}
            inputStyle={styles.input}
            editable={false}
          />
          <Input
            label='操作'
            placeholder='操作'
            leftIcon={{
              type: 'feather',
              name: 'settings'
            }}
            value={log.operation === 'open' ? '解錠' : '施錠'}
            inputStyle={styles.input}
            editable={false}
          />
          <Input
            label='日時'
            placeholder='日時'
            leftIcon={{
              type: 'feather',
              name: 'calendar'
            }}
            value={dayjs(log.created_at).format('YYYY年MM月DD日 HH時mm分')}
            inputStyle={styles.input}
            editable={false}
          />
        </View>
      </Container>
    </>
  )
}
