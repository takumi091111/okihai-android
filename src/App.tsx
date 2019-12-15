import React from 'react'
import { ThemeProvider } from 'react-native-elements'
import AppContainer from '@/utils/navigator'
import ErrorDialog from '@/components/ErrorDialog'
import { useStore } from 'effector-react'
import { store } from '@/store'
import { ToggleErrorDialog } from '@/store/events'

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
  const { errorDialog } = useStore(store)

  const handleButtonPress = () => ToggleErrorDialog()

  return (
    <ThemeProvider theme={theme}>
      <AppContainer />
      <ErrorDialog
        title={errorDialog.title}
        message={errorDialog.message}
        isVisible={errorDialog.isVisible}
        onPressButton={handleButtonPress}
      />
    </ThemeProvider>
  )
}
