import React from 'react'
import { ThemeProvider } from 'react-native-elements'
import { useAppState } from '@/utils/hooks'
import { appEnd } from '@/store/actions'
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
    backgroundColor: '#ffffff',
    containerStyle: {
      borderBottomColor: '#8e8e93'
    },
    leftComponentStyle: {
      color: '#1f1f21'
    },
    centerComponentStyle: {
      color: '#1f1f21'
    }
  }
}

export default () => {
  // バックグラウンド状態になったらデータを書き込み
  useAppState({
    onBackground() {
      appEnd()
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <AppContainer />
    </ThemeProvider>
  )
}
