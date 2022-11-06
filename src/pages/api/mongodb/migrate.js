import { MongoClient } from 'mongodb'
import { DataTypes } from 'sequelize'
import { customSequelize } from 'database/customSequelizeDBconfig'
import createSequelizeModelInSingleStore from 'database/models/migration'

const BULK_SIZE = 1000
export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return migrate(req, res)
  }
}

async function migrate(req, res) {
  const { mongoConfig, singleStoreConfig } = req.body

  const mongoClient = new MongoClient(mongoConfig.host, {})
  const sequelize = customSequelize({
    dbName: singleStoreConfig.dbName,
    dbUser: singleStoreConfig.dbUser,
    dbPassword: singleStoreConfig.dbPassword,
    dbHost: singleStoreConfig.dbHost,
    dbPort: singleStoreConfig.port,
  })

  try {
    await mongoClient.connect()
    const currentDB = mongoClient.db(mongoConfig.dbName)
    const migratedCollections = await migrateSelectedCollections(
      mongoConfig.selectedCollections,
      currentDB,
      sequelize,
      mongoConfig
    )
    res.json({
      migratedCollections,
      success: true,
    })
  } catch (err) {
    const message = `Error while migrating collections`
    console.error(message, err)
    res.json({
      message,
      error: err,
      success: true,
    })
  } finally {
    await mongoClient.close()
  }
}

async function migrateSelectedCollections(
  selectedCollections,
  currentDB,
  sequelize,
  mongoConfig
) {
  const results = []
  // @todo: run this asynchronously
  for (let collectionName of selectedCollections) {
    try {
      const collectionImported = await migrateMongoCollection(
        collectionName,
        currentDB,
        sequelize,
        mongoConfig
      )
      results.push({
        success: true,
        collectionName,
        collection: collectionImported,
      })
    } catch (err) {
      console.error(err)
      results.push({
        success: false,
        collection: { collectionName },
        error: err.message,
      })
    }
  }
  return results
}

async function migrateMongoCollection(
  collectionName,
  currentDB,
  sequelize,
  mongoConfig
) {
  const mongoCollection = currentDB.collection(collectionName)
  const modelFields = await guessMongoSchemaForCollection(mongoCollection)

  modelFields.id = {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }

  const Model = createSequelizeModelInSingleStore({
    sequelize,
    modelName: collectionName,
    fields: modelFields,
    tableName: collectionName,
  })

  await Model.sync()
  // proceed with the migration
  const totalCount = await mongoCollection.count()
  console.log(
    `Proceeding to migrate ${totalCount} items in collection ${collectionName}`
  )
  let migrated = 0
  while (migrated < totalCount) {
    migrated += BULK_SIZE
    const chunk = await mongoCollection
      .find({})
      .skip(migrated)
      .limit(BULK_SIZE)
      .toArray()

    // @todo: handle duplicates from mongodb based on the _id field
    // Now bulk insert to SingleStore
    await Model.bulkCreate(chunk)
  }
}

async function guessMongoSchemaForCollection(mongoCollection) {
  const firstPage = await mongoCollection.find({}).limit(100).toArray()
  let fieldDataTypes = firstPage.reduce((fieldTypes, record) => {
    const recordKeys = Object.keys(record)
    recordKeys.forEach(function (key) {
      const value = record[key]
      if (
        !fieldTypes.hasOwnProperty(key) &&
        typeof value !== 'undefined' &&
        key !== 'id'
      ) {
        fieldTypes[key] = getSequelizeDataTypeForValue(value)
      }
    })
    return fieldTypes
  }, {})

  return fieldDataTypes
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

function getSequelizeDataTypeForValue(value) {
  const fieldType = typeof value
  if (value instanceof Date || fieldType === 'date') {
    return DataTypes.DATE
  } else if (fieldType === 'string') {
    return DataTypes.STRING
  } else if (fieldType === 'number' || !isNaN(value)) {
    return DataTypes.FLOAT
  } else if (fieldType === 'boolean') {
    return DataTypes.BOOLEAN
  } else if (fieldType === 'object') {
    return DataTypes.JSON
  } else {
    return fieldType
  }
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
