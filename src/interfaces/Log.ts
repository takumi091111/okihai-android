export enum LOG_OPERATION {
  OPEN = 'open',
  CLOSE = 'close'
}

export interface Log {
  id: number
  employee_id: number | null
  operation: LOG_OPERATION
  created_at: string
  updated_at: string
}
