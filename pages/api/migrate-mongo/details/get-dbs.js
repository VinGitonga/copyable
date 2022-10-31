import { MongoClient } from 'mongodb'

export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return retrieveDbs(req, res)
  }
}

async function retrieveDbs(req, res) {
  const { host } = req.body
  let databases = []
  const client = new MongoClient(host, {})
  try {
    const admin = client.db().admin()

    const dbInfo = await admin.listDatabases()

    let dbs = []

    for (const db of dbInfo.databases) {
      let dbObj = {
        name: db.name,
        size: db.sizeOnDisk,
        isEmpty: db.empty,
      }
      dbs.push(dbObj)
    }

    databases = filterDbs(dbs)
    console.log(databases)
  } catch (err) {
    console.error(err)
  } finally {
    await client.close()
  }
  res.json(databases)
}

function filterDbs(allDbs) {
  let dbsFilter = ['admin', 'local']

  return allDbs.filter((item) => !dbsFilter.includes(item.name))
}
