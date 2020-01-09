import { Employee } from '@/interfaces/Employee'
import { User } from '@/interfaces/User'

export type LoginInput = Pick<User | Employee, 'email' | 'password'>
export type RegisterInput<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>
export type UpdateInput<T> = Omit<
  T,
  'id' | 'device_id' | 'created_at' | 'updated_at'
>
