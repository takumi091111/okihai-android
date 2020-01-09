import dayjs from 'dayjs'
import React from 'react'
import { Input } from 'react-native-elements'

import Row from '@/components/Row'
import { Log } from '@/interfaces/Log'

enum LOCK_OPERATION {
  OPEN = '解錠',
  CLOSE = '施錠'
}

interface Props {
  log: Log
}

const LockHistoryDetailForm = ({ log }: Props) => {
  const formatEmpId = (employee_id: number | null) => {
    if (employee_id === null) return ''
    return employee_id.toString()
  }

  const logId = log.id.toString()
  const empId = formatEmpId(log.employee_id)
  const lockOperation =
    log.operation === 'open' ? LOCK_OPERATION.OPEN : LOCK_OPERATION.CLOSE
  const createdAt = dayjs(log.created_at).format('YYYY年MM月DD日 HH時mm分')

  return (
    <>
      <Row>
        <Input
          label="履歴ID"
          placeholder="履歴ID"
          leftIcon={{
            type: 'feather',
            name: 'edit'
          }}
          value={logId}
          editable={false}
        />
      </Row>
      <Row>
        <Input
          label="従業員ID"
          leftIcon={{
            type: 'feather',
            name: 'user'
          }}
          value={empId}
          editable={false}
        />
      </Row>
      <Row>
        <Input
          label="操作"
          placeholder="操作"
          leftIcon={{
            type: 'feather',
            name: 'settings'
          }}
          value={lockOperation}
          editable={false}
        />
      </Row>
      <Row>
        <Input
          label="日時"
          placeholder="日時"
          leftIcon={{
            type: 'feather',
            name: 'calendar'
          }}
          value={createdAt}
          editable={false}
        />
      </Row>
    </>
  )
}

export default LockHistoryDetailForm
