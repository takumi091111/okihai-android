import React, { useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'

import Header from '@/components/Header'
import NoPermission from '@/components/NoPermission'
import QRCodeScanner, { BarCodeEvent } from '@/components/QRCodeScanner'
import { QRCodeData } from '@/interfaces/QRCode'
import { lockStatus } from '@/utils/api/common'
import { usePermission } from '@/utils/hooks/usePermission'
import { manualInputSchema } from '@/utils/validation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  barCodeScanner: {
    height: Dimensions.get('window').height
  },
  button: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0
  }
})

const InputAutoOrManual = () => {
  const title: string = useNavigationParam('title')
  const { navigate } = useNavigation()
  const { hasPermission, askPermission } = usePermission('camera')
  const [isLoading, setIsLoading] = useState(false)

  const isValidJSON = (string: string) => {
    try {
      JSON.parse(string)
    } catch (error) {
      return false
    }
    return true
  }

  const isValidQRCode = (args: any): args is QRCodeData => {
    return manualInputSchema.isValidSync(args)
  }

  const fetchLockStatus = async ({ device_id }: QRCodeData) => {
    const result = await lockStatus(device_id)
    if (result.ok === false) {
      navigate('Error')
      return null
    }
    return result
  }

  const sleep = async (seconds: number) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, seconds * 1000)
    })
  }

  const handlePressLogout = () => navigate('Logout')

  const handlePressInputManual = () => navigate('InputManual')

  const handleScanned = async (params: BarCodeEvent) => {
    if (isLoading) return
    if (!isValidJSON(params.data)) return

    const data = JSON.parse(params.data)
    if (!isValidQRCode(data)) return

    setIsLoading(true)
    const result = await fetchLockStatus(data)
    // 1.5秒遅らせることで、何度も処理してしまうのを防ぐ
    await sleep(1.5)
    setIsLoading(false)
    if (!result) return

    const { device_id } = data
    const { is_locked } = result.data

    navigate('Lock', { device_id, is_locked })
  }

  return (
    <>
      {
        <View style={styles.container}>
          <Header title={title} onPressLogout={handlePressLogout} />
          {hasPermission ? (
            <View style={styles.container}>
              <QRCodeScanner isLoading={isLoading} onScanned={handleScanned} />
            </View>
          ) : (
            <NoPermission
              active={!hasPermission}
              iconName="camera-off"
              iconColor="white"
              text="カメラの使用権限がありません"
              textStyle={{ color: 'white' }}
              onPressButton={askPermission}
            />
          )}
          <Button
            buttonStyle={styles.button}
            title="置き配ボックスIDを入力"
            onPress={handlePressInputManual}
          />
        </View>
      }
    </>
  )
}

export default InputAutoOrManual
