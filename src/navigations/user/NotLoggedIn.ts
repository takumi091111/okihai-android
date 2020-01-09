import { createStackNavigator, TransitionPresets } from 'react-navigation-stack'

import Login from '@/screens/user/Login'
import Register from '@/screens/user/Register'
import SelectLoginOrRegister from '@/screens/user/SelectLoginOrRegister'

export default createStackNavigator(
  {
    SelectLoginOrRegister: {
      screen: SelectLoginOrRegister
    },
    Login: {
      screen: Login,
      params: {
        title: 'ログイン'
      }
    },
    Register: {
      screen: Register,
      params: {
        title: '新規登録'
      }
    }
  },
  {
    initialRouteName: 'SelectLoginOrRegister',
    headerMode: 'none',
    defaultNavigationOptions: {
      ...TransitionPresets.ScaleFromCenterAndroid,
      cardStyle: {
        backgroundColor: 'white'
      }
    }
  }
)
