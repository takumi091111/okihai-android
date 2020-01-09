import { LockResponse, LogListResponse } from '@/interfaces/Response'
import { createClient, request } from '@/utils/api/client'

const client = createClient()

export const toggleLock = async (device_id?: string) => {
  const params = {}
  if (device_id) {
    /* eslint dot-notation: 0 */
    params['device_id'] = device_id
  }

  return request<LockResponse, null>(client, {
    params,
    url: '/device/toggle',
    method: 'GET'
  })
}

export const lockStatus = async (device_id?: string) => {
  const params = {}
  if (device_id) {
    /* eslint dot-notation: 0 */
    params['device_id'] = device_id
  }

  return request<LockResponse, null>(client, {
    params,
    url: '/device/status',
    method: 'GET'
  })
}

export const logList = async () => {
  return request<LogListResponse, null>(client, {
    url: '/log/list',
    method: 'GET'
  })
}
