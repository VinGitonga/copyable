import { dbDetails } from '../config/config'
import { DataTypes, Sequelize } from 'sequelize'

const sequelize = new Sequelize(
  dbDetails.DB,
  dbDetails.USER,
  dbDetails.PASSWORD,
  {
    host: dbDetails.HOST,
    dialect: dbDetails.dialect,
    dialectModule: require('mysql2'),
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.users = require('./user.js').default(sequelize, DataTypes)
db.tasks = require('./tasks.js').default(sequelize, DataTypes)
db.activities = require('./activities.js').default(sequelize, DataTypes)
db.singlestoredbs = require('./singlestore.js').default(sequelize, DataTypes)
db.notifications = require('./notifications.js').default(sequelize, DataTypes)

export default db
