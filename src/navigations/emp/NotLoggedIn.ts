import { createStackNavigator, TransitionPresets } from 'react-navigation-stack'

import Login from '@/screens/emp/Login'
import SelectLogin from '@/screens/emp/SelectLogin'

export default createStackNavigator(
  {
    SelectLogin: {
      screen: SelectLogin
    },
    Login: {
      screen: Login,
      params: {
        title: 'ログイン'
      }
    }
  },
  {
    initialRouteName: 'SelectLogin',
    headerMode: 'none',
    defaultNavigationOptions: {
      ...TransitionPresets.ScaleFromCenterAndroid,
      cardStyle: {
        backgroundColor: 'white'
      }
    }
  }
)
