import React from 'react'
import { Path, Svg } from 'react-native-svg'

interface Props {
  size: number
  strokeColor: string
}

const ScanIcon = ({ size, strokeColor = 'white' }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Path
      d="M25,2 L2,2 L2,25"
      fill="none"
      stroke={strokeColor}
      stroke-width="3"
    />
    <Path
      d="M2,75 L2,98 L25,98"
      fill="none"
      stroke={strokeColor}
      stroke-width="3"
    />
    <Path
      d="M75,98 L98,98 L98,75"
      fill="none"
      stroke={strokeColor}
      stroke-width="3"
    />
    <Path
      d="M98,25 L98,2 L75,2"
      fill="none"
      stroke={strokeColor}
      stroke-width="3"
    />
  </Svg>
)

export default ScanIcon
