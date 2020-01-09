import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Edit from '@/screens/emp/Edit'
import InputAutoOrManual from '@/screens/emp/InputAutoOrManual'
import InputManual from '@/screens/emp/InputManual'
import Profile from '@/screens/emp/Profile'
import Register from '@/screens/emp/Register'
import Search from '@/screens/emp/Search'
import SelectSearchOrRegister from '@/screens/emp/SelectSearchOrRegister'
import Lock from '@/screens/Lock'
import { COLOR } from '@/utils/theme/colors'

interface TabBarProps {
  tintColor: string
}

/* eslint react/display-name: 0 */
const LoggedInNavigator = createBottomTabNavigator(
  {
    ScanQRCode: {
      screen: createStackNavigator(
        {
          InputAutoOrManual: {
            screen: InputAutoOrManual,
            params: {
              title: 'QR読取'
            }
          },
          InputManual: {
            screen: InputManual,
            params: {
              title: '置き配ボックスIDの入力'
            }
          },
          Lock: {
            screen: Lock,
            params: {
              title: 'ロック',
              isEmployee: true
            }
          }
        },
        {
          initialRouteName: 'InputAutoOrManual',
          headerMode: 'none',
          defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
            cardStyle: {
              backgroundColor: 'white'
            }
          }
        }
      ),
      navigationOptions: {
        title: 'QR読取',
        tabBarIcon: ({ tintColor }: TabBarProps) => (
          <Icon name="camera" size={24} color={tintColor} />
        )
      }
    },
    ManageEmployee: {
      screen: createStackNavigator(
        {
          SelectSearchOrRegister: {
            screen: SelectSearchOrRegister,
            params: {
              title: '従業員管理'
            }
          },
          Search: {
            screen: Search,
            params: {
              title: '従業員管理 - 検索'
            }
          },
          Edit: {
            screen: Edit,
            params: {
              title: '従業員管理 - 編集'
            }
          },
          Register: {
            screen: Register,
            params: {
              title: '従業員管理 - 新規登録'
            }
          }
        },
        {
          initialRouteName: 'SelectSearchOrRegister',
          headerMode: 'none',
          defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
            cardStyle: {
              backgroundColor: 'white'
            }
          }
        }
      ),
      navigationOptions: {
        title: '従業員管理',
        tabBarIcon: ({ tintColor }: TabBarProps) => (
          <Icon name="users" size={24} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: Profile,
      params: {
        title: 'プロフィール'
      },
      navigationOptions: {
        title: 'プロフィール',
        tabBarIcon: ({ tintColor }: TabBarProps) => (
          <Icon name="user" size={24} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: 'ScanQRCode',
    tabBarOptions: {
      activeTintColor: COLOR.DEEP_RED
    }
  }
)

export default LoggedInNavigator
