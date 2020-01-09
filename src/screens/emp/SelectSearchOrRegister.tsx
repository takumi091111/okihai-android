import { useStore } from 'effector-react'
import React from 'react'
import { Button } from 'react-native-elements'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'

import Center from '@/components/Center'
import Error from '@/components/Error'
import Header from '@/components/Header'
import Row from '@/components/Row'
import { loggedInEmployee as store } from '@/effector/stores/loggedIn'

const SelectSearchOrRegister = () => {
  const emp = useStore(store)
  const title: string = useNavigationParam('title')
  const { navigate } = useNavigation()

  const handlePressLogout = () => navigate('Logout')
  const handlePressSearch = () => navigate('Search')
  const handlePressRegister = () => navigate('Register')

  return (
    <>
      <Header title={title} onPressLogout={handlePressLogout} />
      {emp.is_admin ? (
        <Center style={{ flex: 1 }}>
          <Row>
            <Button title="検索" onPress={handlePressSearch} />
          </Row>
          <Row>
            <Button
              title="新規登録"
              onPress={handlePressRegister}
              type="outline"
            />
          </Row>
        </Center>
      ) : (
        <Error active={true} text="管理者権限がありません" />
      )}
    </>
  )
}

export default SelectSearchOrRegister
