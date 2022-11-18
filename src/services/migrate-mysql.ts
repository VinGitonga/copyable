import axios from 'axios'
import { MySQLHost } from 'types/MySQL'

const baseUrl = '/api/mysql'

export const testMySQLDB = async (host: MySQLHost) => {
  const resp = await axios.post(`${baseUrl}/test`, host, {
    validateStatus: (status) => status < 500,
  })

  return resp.data
}
