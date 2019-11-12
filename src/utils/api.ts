const API_URL = 'https://d1cafa0f.ngrok.io/api'

export const login = async (email: string, password: string) => {
  console.log({
    email,
    password
  })

  const body = new FormData()
  body.append('email', email)
  body.append('password', password)

  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    body
  })
  return response.json()
}

export const toggleLock = async () => {
  const response = await fetch(`${API_URL}/toggle`)
  return response.json()
}
