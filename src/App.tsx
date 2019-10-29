import React, { ReactNode, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Header, ThemeProvider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'

const containerStyle = StyleSheet.flatten({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
})

const Container = ({ children }: { children?: ReactNode }) => (
  <View style={containerStyle}>
    { children }
  </View>
)

interface ZipAddress {
  code: string
  data: {
    pref: string
    city: string
    town: string
    address: string
    fullAddress: string
  }
}

const fetchData = async (zipcode: string): Promise<ZipAddress> => {
  const result = await fetch(`https://api.zipaddress.net/?zipcode=${zipcode}`)
  return result.json()
}

const theme = {
  colors: {
    primary: '#f7f7f7'
  },
  Button: {
    titleStyle: {
      color: '#1f1f21'
    }
  },
  Header: {
    leftComponentStyle: {
      color: '#1f1f21'
    },
    centerComponentStyle: {
      color: '#1f1f21'
    }
  }
}

export default () => {
  const [isLocked, setIsLocked] = useState(true)
  const [lockButtonText, setLockButtonText] = useState('Unlock')

  const handlePress = () => {
    setLockButtonText(isLocked ? 'Lock' : 'Unlock')
    setIsLocked(!isLocked)
  }

  return (
    <ThemeProvider theme={theme}>
      <Header
        leftComponent={{ icon: 'menu' }}
        centerComponent={{ text: '置き配' }}
      />
      <Container>
        {
          isLocked ?
          <Icon name='lock' size={100} /> :
          <Icon name='unlock' size={100} />
        }
        <Button title={lockButtonText} onPress={handlePress} />
      </Container>
    </ThemeProvider>
  )
}
