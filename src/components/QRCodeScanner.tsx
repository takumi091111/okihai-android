import { BarCodeScanner } from 'expo-barcode-scanner'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

export interface BarCodeEvent {
  type: string
  data: string
  [key: string]: any
}

interface Props {
  onScanned: (params: BarCodeEvent) => void
}

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

const QRCodeScanner = ({ onScanned }: Props) => (
  <View style={styles.container}>
    <BarCodeScanner
      style={[StyleSheet.absoluteFillObject, styles.barCodeScanner]}
      barCodeTypes={['qr']}
      onBarCodeScanned={onScanned}
    />
  </View>
)

export default QRCodeScanner
