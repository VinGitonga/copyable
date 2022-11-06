import axios from 'axios'

const baseUrl = '/api/mongodb'

export const testConnectToDB = async ({ mongoDbUri }) => {
  const resp = await axios.post(`${baseUrl}/test-connection`, {
    host: mongoDbUri,
  })

  return resp.data
}

export const testMigrate = async ({ mongoConfig, singleStoreConfig }) => {
  const resp = await axios.post(`${baseUrl}/migrate`, {
    mongoConfig: mongoConfig,
    singleStoreConfig: singleStoreConfig,
  })

  return resp.data
}
