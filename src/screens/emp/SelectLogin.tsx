import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { useNavigation } from 'react-navigation-hooks'

import Center from '@/components/Center'
import Row from '@/components/Row'

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    marginBottom: 40
  },
  empLabel: {
    alignItems: 'center',
    paddingTop: 30
  }
})

const SelectLoginOrRegister = () => {
  const { navigate } = useNavigation()

  const handlePressLogin = () => navigate('Login')

  return (
    <Center style={{ flex: 1 }}>
      <Image source={require('@assets/logo.png')} style={styles.image} />
      <Row>
        <Button title="ログイン" onPress={handlePressLogin} />
      </Row>
      <Row style={styles.empLabel}>
        <Text h3>従業員用</Text>
      </Row>
    </Center>
  )
}

export default SelectLoginOrRegister
