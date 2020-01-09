import React from 'react'
import { Header as _Header } from 'react-native-elements'

import { COLOR } from '@/utils/theme/colors'

interface Props {
  title?: string
  onPressBack?: () => void
  onPressLogout?: () => void
}

const Header = ({ title, onPressBack, onPressLogout }: Props) => (
  <_Header
    centerComponent={{
      text: title
    }}
    leftComponent={
      onPressBack
        ? {
            type: 'feather',
            icon: 'arrow-left',
            onPress: onPressBack
          }
        : null
    }
    rightComponent={
      onPressLogout
        ? {
            type: 'feather',
            icon: 'log-out',
            color: COLOR.RED,
            onPress: onPressLogout
          }
        : null
    }
  />
)

export default Header
