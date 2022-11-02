import {Sequelize} from 'sequelize'


export function customSequelize({ dbName, dbUser, dbPassword, dbHost }){
    const sequelize = new Sequelize(
      dbName,
      dbUser,
      dbPassword,
      {
        host: dbHost,
        dialect: "mysql",
        dialectModule: require('mysql2'),
        dialectOptions: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
        logging: false,
      }
    )

    return sequelize
}

