import {MongoClient} from 'mongodb'
import {DataTypes} from 'sequelize'
import {customSequelize} from 'database/customSequelizeDBconfig'
import migrationCustomModel from 'database/models/migration'

export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return testMigrate(req, res)
  }
}

async function testMigrate(req, res) {
  const { mongoConfig: mongoDbConfig, singleStoreConfig } = req.body

  const client = new MongoClient(mongoDbConfig.host, {})
  const sequelize = customSequelize({
    dbName: singleStoreConfig.dbName,
    dbUser: singleStoreConfig.dbName,
    dbPassword: singleStoreConfig.dbPassword,
    dbHost: singleStoreConfig.dbHost,
  })

  try {
    await client.connect()

    const currentDB = client.db(mongoDbConfig.dbName)
    const collection = currentDB.collection(mongoDbConfig.collectionName)
    // retrive the all the columns(fields in MongoDB collection by getting just one collection)
    let fields = Object.keys(await collection.findOne({}))
    // remove id field if exists in collection to prevent conflict with Singlestore ID field
    fields = removeFieldOnce(fields, 'id')
    let fieldDatatypes = new Map()
    // loop on each field and get typeof datatype
    for (let field of fields) {
      fieldDatatypes.set(field, typeof (await collection.findOne({}))[field])
    }

    let modelFields = {}

    // populate the model fields
    fieldDatatypes.forEach((value, key) => {
      if (value === 'number') {
        modelFields[key] = DataTypes.FLOAT
      } else if (value === 'string') {
        modelFields[key] = DataTypes.STRING
      } else if (value === 'boolean') {
        modelFields[key] = DataTypes.BOOLEAN
      } else if (value === 'object') {
        modelFields[key] = DataTypes.JSON
      } else if (value === 'date') {
        modelFields[key] = DataTypes.DATE
      }
    })

    let idObj = {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    }

    const Model = migrationCustomModel({
      sequelize,
      modelName: mongoDbConfig.collectionName,
      fields: mergeObjs(idObj, modelFields),
      tableName: mongoDbConfig.collectionName,
    })

    // sync the model
    await Model.sync({ force: true })

    let documentsArr = Array.from(await toArray(collection.find()))

    // Now bulk insert to SingleStore

    await Model.bulkCreate(documentsArr)

    res.json({
      collectionLen: documentsArr.length,
      tableName: mongoDbConfig.collectionName,
    })
  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }
}

function removeFieldOnce(arr, value) {
  let index = arr.indexOf(value)
  if (index > -1) {
    arr.splice(index, 1)
  }

  return arr
}

function mergeObjs(obj1, obj2) {
  let obj3 = {}
  for (let attrname in obj1) {
    obj3[attrname] = obj1[attrname]
  }
  for (let attrname in obj2) {
    obj3[attrname] = obj2[attrname]
  }
  return obj3
}

/**
 * fn that retrieves items from an array asynchronousy
 * @param {*} iterator
 */
function toArray(iterator) {
  return new Promise((resolve, reject) => {
    iterator.toArray((err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
