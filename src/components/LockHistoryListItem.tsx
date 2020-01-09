import dayjs from 'dayjs'
import React from 'react'
import { ListItem } from 'react-native-elements'

import { Log } from '@/interfaces/Log'
import { COLOR } from '@/utils/theme/colors'

enum OPERATOR {
  USER = 'ユーザー',
  EMPLOYEE = '配達員'
}

enum LOCK_OPERATION {
  OPEN = '解錠',
  CLOSE = '施錠'
}

enum ICON_NAME {
  LOCKED = 'lock',
  UNLOCKED = 'unlock',
  LOADING = 'loader',
  ERROR = 'x'
}

interface Props {
  log: Log
  onPress: (log: Log) => void
}

const LockHistoryListItem = ({ log, onPress }: Props) => {
  const style = {
    borderLeftWidth: 5,
    borderColor: {
      open: COLOR.GREEN,
      close: COLOR.RED
    }[log.operation]
  }

  const chevronStyle = {
    color: '#8e8e93',
    size: 30
  }

  const operator = log.employee_id === null ? OPERATOR.USER : OPERATOR.EMPLOYEE
  const iconName =
    log.operation === 'open' ? ICON_NAME.UNLOCKED : ICON_NAME.LOCKED
  const lockOperation =
    log.operation === 'open' ? LOCK_OPERATION.OPEN : LOCK_OPERATION.CLOSE
  const title = [lockOperation, operator].join(' / ')
  const createdAt = dayjs(log.created_at).format('YYYY年MM月DD日 HH時mm分')

  return (
    <ListItem
      leftIcon={{
        type: 'feather',
        name: iconName
      }}
      title={title}
      subtitle={createdAt}
      chevron={chevronStyle}
      containerStyle={style}
      bottomDivider={true}
      onPress={() => onPress(log)}
    />
  )
}

export default LockHistoryListItem
