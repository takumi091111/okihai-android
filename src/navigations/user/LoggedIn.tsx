import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Lock from '@/screens/Lock'
import LockHistory from '@/screens/user/LockHistory'
import LockHistoryDetail from '@/screens/user/LockHistoryDetail'
import Profile from '@/screens/user/Profile'
import { COLOR } from '@/utils/theme/colors'

interface TabBarProps {
  tintColor: string
}

/* eslint react/display-name: 0 */
const LoggedInNavigator = createBottomTabNavigator(
  {
    Lock: {
      screen: Lock,
      params: {
        title: 'ロック'
      },
      navigationOptions: {
        title: 'ロック',
        tabBarIcon: ({ tintColor }: TabBarProps) => (
          <Icon name="lock" size={24} color={tintColor} />
        )
      }
    },
    Log: {
      screen: createStackNavigator(
        {
          LockHistory: {
            screen: LockHistory,
            params: {
              title: '開閉履歴'
            }
          },
          LockHistoryDetail: {
            screen: LockHistoryDetail,
            params: {
              title: '開閉履歴 - 詳細'
            }
          }
        },
        {
          initialRouteName: 'LockHistory',
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
        title: '開閉履歴',
        tabBarIcon: ({ tintColor }: TabBarProps) => (
          <Icon name="book" size={24} color={tintColor} />
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
    initialRouteName: 'Lock',
    tabBarOptions: {
      activeTintColor: COLOR.DEEP_RED
    }
  }
)

export default LoggedInNavigator
