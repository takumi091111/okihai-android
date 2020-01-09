import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from 'react-navigation-hooks'

import Center from '@/components/Center'
import Row from '@/components/Row'

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    marginBottom: 40
  }
})

const SelectLoginOrRegister = () => {
  const { navigate } = useNavigation()

  const handlePressLogin = () => navigate('Login')
  const handlePressRegister = () => navigate('Register')

  return (
    <Center style={{ flex: 1 }}>
      <Image source={require('@assets/logo.png')} style={styles.image} />
      <Row>
        <Button title="ログイン" onPress={handlePressLogin} />
      </Row>
      <Row>
        <Button type="outline" title="新規登録" onPress={handlePressRegister} />
      </Row>
    </Center>
  )
}

export default SelectLoginOrRegister
