import axios from 'axios'

const baseUrl = '/api/add-singlestoredb'

export const saveDbToProfile = async ({ dbDetails }) => {
  const resp = await axios.post(`${baseUrl}`, dbDetails, {
    validateStatus: (status) => status < 500,
  })

  return resp.data
}

export const fetchMyDbs = async () => {
  const resp = await axios.get('/api/get-singlestoredbs')

  return resp.data
}
