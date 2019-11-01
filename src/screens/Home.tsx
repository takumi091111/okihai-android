import React from 'react'
import { Text } from 'react-native-elements'
import { NavigationContainerProps, withNavigation } from 'react-navigation'
import Container from '@/components/Container'
import Header from '@/components/Header'

const Home = ({ navigation }: NavigationContainerProps) => {
  return (
    <>
      <Header
        text={navigation.state.params.title}
        onMenuButtonPress={() => navigation.toggleDrawer()}
      />
      <Container isCenter={true}>
        <Text>Home Screen</Text>
      </Container>
    </>
  )
}

export default withNavigation(Home)
