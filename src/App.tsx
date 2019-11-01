import React from 'react'
import { ThemeProvider } from 'react-native-elements'
import AppContainer from '@/navigator'

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

export default () => (
  <ThemeProvider theme={theme}>
    <AppContainer />
  </ThemeProvider>
)
