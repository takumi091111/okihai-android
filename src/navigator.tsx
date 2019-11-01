import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'

import HomeScreen from '@/screens/Home'
import LoginScreen from '@/screens/Login'
import LockScreen from '@/screens/Lock'

const drawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
    params: {
      title: 'ホーム'
    },
    navigationOptions: {
      title: 'ホーム'
    }
  },
  Login: {
    screen: LoginScreen,
    params: {
      title: 'ログイン'
    },
    navigationOptions: {
      title: 'ログイン',
      drawerLabel: () => null,
      drawerLockMode: 'locked-closed'
    }
  },
  Lock: {
    screen: LockScreen,
    params: {
      title: 'ロック'
    },
    navigationOptions: {
      title: 'ロック'
    }
  }
}, {
  initialRouteName: 'Login'
})

export default createAppContainer(drawerNavigator)
