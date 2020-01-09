import { Theme } from 'react-native-elements'

import { COLOR } from '@/utils/theme/colors'

export default {
  colors: {
    primary: COLOR.DEEP_RED,
    greyOutline: COLOR.GRAY
  },
  Header: {
    backgroundColor: 'white',
    containerStyle: {
      borderBottomColor: COLOR.GRAY
    },
    leftComponentStyle: {
      color: '#1f1f21'
    },
    centerComponentStyle: {
      color: '#1f1f21'
    }
  },
  Input: {
    inputContainerStyle: {
      width: '100%',
      paddingTop: 5,
      paddingBottom: 5,
      borderBottomColor: COLOR.GRAY
    },
    labelStyle: {
      fontSize: 14
    },
    leftIconContainerStyle: {
      paddingRight: 15
    },
    inputStyle: {
      width: '90%'
    }
  },
  Button: {
    containerStyle: {
      width: '100%'
    },
    buttonStyle: {
      paddingTop: 10,
      paddingBottom: 10,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 100
    }
  },
  ButtonGroup: {
    containerStyle: {
      borderRadius: 100
    },
    buttonStyle: {
      borderColor: COLOR.GRAY
    }
  },
  SearchBar: {
    lightTheme: true,
    containerStyle: {
      backgroundColor: 'transparent',
      paddingTop: 0,
      paddingBottom: 0
    },
    inputContainerStyle: {
      backgroundColor: 'transparent'
    }
  },
  ListItem: {
    containerStyle: {
      borderBottomColor: COLOR.GRAY
    },
    leftIcon: {
      containerStyle: {
        paddingRight: 15
      }
    }
  }
} as Theme
