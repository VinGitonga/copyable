import { MongoClient } from 'mongodb'
import { DataTypes } from 'sequelize'
import { customSequelize } from 'database/customSequelizeDBconfig'
import createSequelizeModelInSingleStore from 'database/models/migration'
import { getSession } from 'next-auth/react'
import { ACTIVITY_TYPES, createActivity } from '../../../utils/activities-util'
import { randomUUID } from 'crypto'

const BULK_SIZE = 1000
export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return migrate(req, res)
  }
}

async function migrate(req, res) {
  const { mongoConfig, singleStoreConfig } = req.body
  const session = await getSession({ req })
  const createdBy = session.user?.id
  const mongoClient = new MongoClient(mongoConfig.host, {})
  const sequelize = customSequelize({
    dbName: singleStoreConfig.dbName,
    dbUser: singleStoreConfig.dbUser,
    dbPassword: singleStoreConfig.dbPassword,
    dbHost: singleStoreConfig.dbHost,
    dbPort: singleStoreConfig.port,
  })
  const migrationId = randomUUID()
  try {
    await createActivity({
      description: `Migration ${migrationId} started by user ${createdBy}`,
      type: ACTIVITY_TYPES.MIGRATION_STARTED,
      createdBy,
      migrationId,
      payload: {
        singleStoreDbName: singleStoreConfig.dbName,
        mongoDbName: mongoConfig.dbName,
        selectedCollections: mongoConfig.selectedCollections,
      },
    })
    await mongoClient.connect()
    const currentDB = mongoClient.db(mongoConfig.dbName)
    const config = {
      selectedCollections: mongoConfig.selectedCollections,
      currentDB,
      sequelize,
      createdBy,
      migrationId,
    }
    const migratedCollections = await migrateSelectedCollections(config)
    const message = `Successfully migrated database ${mongoConfig.dbName} to ${singleStoreConfig.dbName}`
    await createActivity({
      description: message,
      type: ACTIVITY_TYPES.MIGRATION_ENDED,
      createdBy,
      migrationId,
      payload: {
        singleStoreDbName: singleStoreConfig.dbName,
        mongoDbName: mongoConfig.dbName,
        selectedCollections: mongoConfig.selectedCollections,
        migratedCollections,
      },
    })
    res.json({
      message,
      migratedCollections,
      success: true,
    })
  } catch (err) {
    const message = `Error while migrating collections in migration ${migrationId}, user ${createdBy}`
    await createActivity({
      description: message,
      type: ACTIVITY_TYPES.MIGRATION_ERROR,
      createdBy,
      migrationId,
      payload: {
        singleStoreDbName: singleStoreConfig.dbName,
        mongoDbName: mongoConfig.dbName,
        selectedCollections: mongoConfig.selectedCollections,
      },
    })
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

async function migrateSelectedCollections(config) {
  const { selectedCollections } = config
  const results = []
  // @todo: run this asynchronously
  for (let collectionName of selectedCollections) {
    try {
      const collectionImported = await migrateMongoCollection({
        ...config,
        collectionName,
      })
      results.push({
        success: true,
        collection: collectionName,
        result: collectionImported,
      })
    } catch (err) {
      console.error(err)
      results.push({
        success: false,
        collection: collectionName,
        error: err.message,
      })
    }
  }
  return results
}

async function migrateMongoCollection(config) {
  const { collectionName, currentDB, sequelize, createdBy } = config
  const mongoCollection = currentDB.collection(collectionName)
  const modelFields = await guessMongoSchemaForCollection(mongoCollection)
  const result = {
    migrated: 0,
    total: 0,
  }
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
    `Proceeding to migrate ${totalCount} items in collection "${collectionName}"`
  )
  let migrated = 0
  result.total = totalCount

  while (migrated < totalCount) {
    const chunk = await mongoCollection
      .find({})
      .skip(migrated)
      .limit(BULK_SIZE)
      .toArray()
    result.migrated += chunk.length
    migrated += chunk.length
    // @todo: handle duplicates from mongodb based on the _id field
    // Now bulk insert to SingleStore
    await Model.bulkCreate(chunk)
  }
  return result
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
