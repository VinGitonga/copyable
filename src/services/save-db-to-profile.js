import axios from 'axios'

const baseUrl = '/api/singlestore'

export const saveDbToProfile = async ({ dbDetails }) => {
  const resp = await axios.post(`${baseUrl}/connect`, dbDetails, {
    validateStatus: (status) => status < 500,
  })

  return resp.data
}

export const fetchMySingleStoreDatabases = async () => {
  try {
    const resp = await axios.get(`${baseUrl}/list-dbs`)
    return resp.data
  } catch (err) {
    return err
  }
}
