import { BarCodeScanner } from 'expo-barcode-scanner'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

import Loading from '@/components/Loading'
import ScanIcon from '@/components/ScanIcon'

export interface BarCodeEvent {
  type: string
  data: string
  [key: string]: any
}

interface Props {
  isLoading: boolean
  onScanned: (params: BarCodeEvent) => void
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'black'
  },
  barCodeScanner: {
    height: Dimensions.get('window').height
  },
  loadingContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    width: 200,
    height: 150,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  squareContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const QRCodeScanner = ({ isLoading, onScanned }: Props) => (
  <View style={styles.container}>
    <BarCodeScanner
      style={[StyleSheet.absoluteFillObject, styles.barCodeScanner]}
      barCodeTypes={['qr']}
      onBarCodeScanned={onScanned}
    />
    <View style={styles.squareContainer}>
      <ScanIcon size={256} strokeColor="white" />
    </View>
    {isLoading ? (
      <View style={styles.loadingContainer}>
        <View style={styles.loading}>
          <Loading active={isLoading} text="スキャン中" />
        </View>
      </View>
    ) : null}
  </View>
)

export default QRCodeScanner
