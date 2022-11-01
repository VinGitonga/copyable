import axios from 'axios'

const baseUrl = '/api/migrate-mongo'

export const testConnectToDB = async ({ mongoDbUri }) => {
  const resp = await axios.post(`${baseUrl}/test-connection`, {
    host: mongoDbUri,
  })

  return resp.data
}
