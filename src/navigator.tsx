import React from 'react'
import { Easing, Animated } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Transition } from 'react-native-reanimated'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'

import Splash from '@/screens/Splash'
import LoginOrRegister from '@/screens/LoginOrRegister'
import Login from '@/screens/Login'
import Logout from '@/screens/Logout'
import Register from '@/screens/Register'
import Home from '@/screens/Home'
import Lock from '@/screens/Lock'

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

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Home,
    params: {
      title: 'ホーム'
    },
    navigationOptions: {
      title: 'ホーム'
    }
  },
  Logout: {
    screen: Logout,
    params: {
      title: 'ログアウト'
    },
    navigationOptions: {
      title: 'ログアウト'
    }
  }
}, {
  initialRouteName: 'Home'
})

const StackNavigator = createStackNavigator({
  Main: {
    screen: DrawerNavigator
  },
  Lock: {
    screen: Lock,
    params: {
      title: 'ロック'
    },
    navigationOptions: {
      title: 'ロック'
    }
  }
}, {
  initialRouteName: 'Main',
  headerMode: 'none',
  transitionConfig
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
    screen: StackNavigator
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
    screen: StackNavigator
  },
  NotLoggedIn: {
    screen: NotLoggedInNavigator
  }
}, {
  initialRouteName: 'Splash',
  transition
})

export default createAppContainer(RootNavigator)
