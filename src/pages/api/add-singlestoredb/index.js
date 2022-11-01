import { customSequelize } from 'database/customSequelizeDBconfig'
import db from 'database/models'

export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return addSingleStoreDBToProfile(req, res)
  }
}

async function addSingleStoreDBToProfile(req, res) {
  const { dbName, dbHost, dbPassword, dbUser, dbOwner } = req.body

  const sequelize = customSequelize({ dbName, dbUser, dbPassword, dbHost })

  let connectionStatus = await testConnectToDB(sequelize)

  if (!connectionStatus) {
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
      res.status(400).json({
        message: 'Database already exists in your profile',
        status: false,
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
        status: true,
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
