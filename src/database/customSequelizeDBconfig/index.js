import { Sequelize } from 'sequelize'

export function customSequelize({
  dbName,
  dbUser,
  dbPassword,
  dbHost,
  dbPort,
}) {
  const options = {
    host: dbHost,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
  if (dbPort) {
    options.port = dbPort
  }
  return new Sequelize(dbName, dbUser, dbPassword, options)
}
