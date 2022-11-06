import { customSequelize } from 'database/customSequelizeDBconfig'
import db from 'database/models'
import { CreateSinglestoreDBErrorCode } from 'types/Singlestore'

export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return addSingleStoreDBToProfile(req, res)
  }
}

async function addSingleStoreDBToProfile(req, res) {
  const { dbName, dbHost, dbPassword, dbUser, dbOwner, dbPort } = req.body

  const sequelize = customSequelize({
    dbName,
    dbUser,
    dbPassword,
    dbHost,
    dbPort,
  })

  let success = await testConnectToDB(sequelize)

  if (!success) {
    res.status(400).json({
      message:
        'Connection to Singlestore Database failed!, Check your details and try again',
      status: false,
    })
  } else {
    // sync dbs
    await db.singlestoredbs.sync()

    // confirm if the same database exists
    let dbInstance = await db.singlestoredbs.findOne({
      where: {
        dbName: dbName,
      },
    })

    if (dbInstance) {
      res.status(200).json({
        message: 'Database already exists in your profile',
        code: CreateSinglestoreDBErrorCode.EXISTS,
        success: true,
      })
    } else {
      // proceed to create the dbInstance to profile
      let newDbInstance = await db.singlestoredbs.create({
        dbName: dbName,
        dbHost: dbHost,
        dbOwner: dbOwner,
        dbUser: dbUser,
        dbPassword: dbPassword,
      })

      console.log(newDbInstance)

      res.status(200).json({
        message: 'Database Info has been successfully to your profile',
        success: true,
      })
    }
  }
}

async function testConnectToDB(sequelize) {
  try {
    await sequelize.authenticate()
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}
