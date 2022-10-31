import { MongoClient } from 'mongodb'

export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return retrieveCollections(req, res)
  }
}

async function retrieveCollections(req, res) {
  const { host, db: databaseName } = req.body
  console.log(host, databaseName)
  const client = new MongoClient(host, {})
  let collectionNames = []
  try {
    const db = client.db(databaseName)
    collectionNames = (await db.listCollections().toArray()).map(
      ({ name }) => name
    )

    console.log(collectionNames)
  } catch (err) {
    const msg = `Error while getting collections from db ${databaseName}`
    console.error(msg, err)
    return res.json({
      success: false,
      error: msg,
      raw: err,
    })
  } finally {
    await client.close()
  }
  res.json(collectionNames)
}
