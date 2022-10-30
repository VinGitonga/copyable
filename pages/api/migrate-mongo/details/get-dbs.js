import { MongoClient } from "mongodb";

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      return retrieveDbs(req, res);
  }
}

async function retrieveDbs(req, res) {
  const { host } = req.body;

  const client = new MongoClient(host, {});

  const admin = client.db().admin();

  const dbInfo = await admin.listDatabases();

  let dbs = [];

  for (const db of dbInfo.databases) {
    let dbObj = {
      name: db.name,
      size: db.sizeOnDisk,
      isEmpty: db.empty,
    };
    dbs.push(dbObj);
  }

  let mongoDbs = filterDbs(dbs);

  console.log(mongoDbs);

  res.json(mongoDbs);
}

function filterDbs(allDbs) {
  let dbsFilter = ["admin", "local"];

  let filteredDbs = allDbs.filter((item) => !dbsFilter.includes(item.name));

  return filteredDbs;
}
