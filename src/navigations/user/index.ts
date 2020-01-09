import { createAppContainer } from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import { createStackNavigator } from 'react-navigation-stack'

import { forFade, switchTransition } from '@/navigations/transition'
import LoggedIn from '@/navigations/user/LoggedIn'
import NotLoggedIn from '@/navigations/user/NotLoggedIn'
import Error from '@/screens/Error'
import Logout from '@/screens/Logout'

export default (isLoggedIn: boolean) =>
  createAppContainer(
    createStackNavigator(
      {
        Main: {
          screen: createAnimatedSwitchNavigator(
            {
              LoggedIn: {
                screen: LoggedIn
              },
              NotLoggedIn: {
                screen: NotLoggedIn
              },
              Logout: {
                screen: Logout
              }
            },
            {
              transition: switchTransition,
              initialRouteName: isLoggedIn ? 'LoggedIn' : 'NotLoggedIn'
            }
          )
        },
        Error: {
          screen: Error
        }
      },
      {
        initialRouteName: 'Main',
        mode: 'modal',
        headerMode: 'none',
        defaultNavigationOptions: {
          cardStyle: {
            backgroundColor: 'transparent'
          },
          cardStyleInterpolator: props => forFade(props)
        }
      }
    )
  )
