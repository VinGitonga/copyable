import {MongoClient} from 'mongodb'

export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
      testConnectToDB(req, res)
  }
}

async function testConnectToDB(req, res) {
  const { host } = req.body

  const client = new MongoClient(host, {})

  try {
    let db = client.db('testings')

    let readyToConnect = await isConnected(db)
    console.log(readyToConnect)

    res.json(readyToConnect)
  } catch (err) {
    console.log(err)
  }
}

const isConnected = async (db) => {
  if (!db) {
    return false
  }

  let res

  try {
    res = await db.admin().ping()
  } catch (err) {
    return false
  }

  return Object.prototype.hasOwnProperty.call(res, 'ok') && res.ok === 1
}
