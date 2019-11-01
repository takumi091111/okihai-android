import React, { useState } from 'react'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'
import { NavigationContainerProps, withNavigation } from 'react-navigation'
import Container from '@/components/Container'
import Header from '@/components/Header'

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

const Lock = ({ navigation }: NavigationContainerProps) => {
  const [isLocked, setIsLocked] = useState(true)
  const [lockButtonText, setLockButtonText] = useState('Unlock')

  const handlePress = () => {
    setLockButtonText(isLocked ? 'Lock' : 'Unlock')
    setIsLocked(!isLocked)
  }

  return (
    <>
      <Header
        text={navigation.state.params.title}
        onMenuButtonPress={() => navigation.toggleDrawer()}
      />
      <Container isCenter={true}>
        {
          isLocked ?
          <Icon name='lock' size={100} /> :
          <Icon name='unlock' size={100} />
        }
        <Button title={lockButtonText} onPress={handlePress} />
      </Container>
    </>
  )
}

export default withNavigation(Lock)
