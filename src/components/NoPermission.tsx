import React from 'react'
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native'
import { Button, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'

import Row from '@/components/Row'

interface Props {
  active: boolean
  iconName: string
  iconColor?: string
  text?: string
  textStyle?: StyleProp<TextStyle>
  onPressButton?: () => void
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    alignItems: 'center'
  },
  text: {
    alignItems: 'center',
    paddingBottom: 30
  }
})

const NoPermission = ({
  active,
  iconName,
  iconColor = 'black',
  text,
  textStyle,
  onPressButton
}: Props) => {
  if (!active) return null
  return (
    <View style={styles.container}>
      <Row style={styles.icon}>
        <Icon name={iconName} size={48} color={iconColor} />
      </Row>
      {text ? (
        <Row style={styles.text}>
          <Text h4 style={textStyle}>
            {text}
          </Text>
        </Row>
      ) : null}
      {onPressButton ? (
        <Button title="権限を設定する" onPress={onPressButton} />
      ) : null}
    </View>
  )
}

export default NoPermission
