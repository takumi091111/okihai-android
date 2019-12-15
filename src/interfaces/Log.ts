export enum LogOperation {
  OPEN = 'open',
  CLOSE = 'close'
} 

export interface Log {
  id: number
  employee_id: number | null
  operation: LogOperation
  created_at: string
  updated_at: string
} 
