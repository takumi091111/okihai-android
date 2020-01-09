import { Employee } from '@/interfaces/Employee'
import { User } from '@/interfaces/User'

export type LoginRequest<T> = T extends User
  ? Pick<User, 'email' | 'password'> & {
      noticeToken?: string
    }
  : Pick<Employee, 'email' | 'password'>

export type RegisterRequest<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>
export type UpdateRequest<T> = Partial<
  Omit<T, 'device_id' | 'created_at' | 'updated_at'>
>
