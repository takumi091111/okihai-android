import React from 'react'
import { Easing, Animated } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Transition } from 'react-native-reanimated'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'

import Splash from '@/screens/Splash'
import LoginOrRegister from '@/screens/LoginOrRegister'
import Login from '@/screens/Login'
import Logout from '@/screens/Logout'
import Register from '@/screens/Register'
import Lock from '@/screens/Lock'
import BrowseOrEdit from '@/screens/BrowseOrEdit'
import ProfileBrowse from '@/screens/ProfileBrowse'
import ProfileEdit from '@/screens/ProfileEdit'
import Log from '@/screens/Log'

import Icon from 'react-native-vector-icons/Feather'

const transition = (
  <Transition.Together>
    <Transition.In
      type='fade'
      durationMs={200}
    />
    <Transition.Out
      type='fade'
      durationMs={200}
      interpolation='easeIn'
    />
  </Transition.Together>
)

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {      
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0]
      })

      return {
        transform: [{ translateX }]
      }
    },
  }
}

const ProfileNavigator = createStackNavigator({
  BrowseOrEdit: {
    screen: BrowseOrEdit,
    params: {
      title: 'プロフィールの閲覧/編集'
    },
    navigationOptions: {
      title: 'プロフィールの閲覧/編集'
    }
  },
  ProfileBrowse: {
    screen: ProfileBrowse,
    params: {
      title: 'プロフィール'
    },
    navigationOptions: {
      title: 'プロフィール'
    }
  },
  ProfileEdit: {
    screen: ProfileEdit,
    params: {
      title: 'プロフィール編集'
    },
    navigationOptions: {
      title: 'プロフィール編集'
    }
  }
}, {
  initialRouteName: 'BrowseOrEdit',
  headerMode: 'none',
  transitionConfig
})

const AppNavigator = createBottomTabNavigator({
  Lock: {
    screen: Lock,
    params: {
      title: 'ロック開閉'
    },
    navigationOptions: {
      title: 'ロック',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='lock' size={24} color={tintColor} />
      )
    }
  },
  Log: {
    screen: Log,
    params: {
      title: '開閉ログ一覧'
    },
    navigationOptions: {
      title: '開閉ログ',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='book' size={24} color={tintColor} />
      )
    }
  },
  Profile: {
    screen: ProfileNavigator,
    params: {
      title: 'プロフィールの閲覧/編集'
    },
    navigationOptions: {
      title: 'プロフィール',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='user' size={24} color={tintColor} />
      )
    }
  },
  Logout: {
    screen: Logout,
    navigationOptions: {
      title: 'ログアウト',
      tabBarVisible: false,
      tabBarButtonComponent: () => null
    }
  }
}, {
  initialRouteName: 'Lock',
  tabBarOptions: {
    activeTintColor: '#00b894'
  }
})

const LoginOrRegisterStackNavigator = createStackNavigator({
  Select: {
    screen: LoginOrRegister,
    params: {
      title: 'ログインまたは新規登録'
    },
    navigationOptions: {
      title: 'ログインまたは新規登録'
    }
  },
  Login: {
    screen: Login,
    params: {
      title: 'ログイン'
    },
    navigationOptions: {
      title: 'ログイン'
    }
  },
  Register: {
    screen: Register,
    params: {
      title: '新規登録'
    },
    navigationOptions: {
      title: '新規登録'
    }
  }
}, {
  initialRouteName: 'Select',
  headerMode: 'none',
  transitionConfig
})

const NotLoggedInNavigator = createAnimatedSwitchNavigator({
  LoginOrRegister: {
    screen: LoginOrRegisterStackNavigator
  },
  AfterLogin: {
    screen: AppNavigator
  }
}, {
  initialRouteName: 'LoginOrRegister',
  transition
})

const RootNavigator = createAnimatedSwitchNavigator({
  Splash: {
    screen: Splash
  },
  LoggedIn: {
    screen: AppNavigator
  },
  NotLoggedIn: {
    screen: NotLoggedInNavigator
  }
}, {
  initialRouteName: 'Splash',
  transition
})

export default createAppContainer(RootNavigator)
