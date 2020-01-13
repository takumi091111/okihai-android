import axios from 'axios'
import { AsyncStorage } from 'react-native'

interface GistData {
  files: {
    'endpoint.json': {
      raw_url: string
    }
  }
}

interface RawData {
  url: string
}

const GIST_URL = 'https://api.github.com/gists/e8a5121d663e4a7af1c6472f5dbb8f6f'

AsyncStorage.removeItem('API_URL')

export const getApiUrl = async () => {
  const API_URL = await AsyncStorage.getItem('API_URL')
  if (API_URL) return API_URL

  const gist = await axios.get<GistData>(GIST_URL)
  if (gist.status !== 200) {
    throw new Error('Gist Not Found')
  }
  const { files } = gist.data
  const { raw_url } = files['endpoint.json']

  const result = await axios.get<RawData>(raw_url)
  if (result.status !== 200) {
    throw new Error('Gist Not Found')
  }
  const { url } = result.data
  await AsyncStorage.setItem('API_URL', url, () => {
    console.log('set API_URL', url)
  })

  return url
}
