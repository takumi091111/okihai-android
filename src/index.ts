import 'expo/build/Expo.fx'

import { activateKeepAwake } from 'expo-keep-awake'
import registerRootComponent from 'expo/build/launch/registerRootComponent'

import App from '@/App.user'

/* eslint no-undef: 0 */
if (__DEV__) {
  activateKeepAwake()
}

registerRootComponent(App)
