import { User } from '@/interfaces/User'

export type Employee = Omit<User, 'address' | 'device_id'> & {
  is_admin: boolean
}
