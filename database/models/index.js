import { dbDetails } from "../config/config";
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(dbDetails.DB, dbDetails.USER, dbDetails.PASSWORD, {
    host: dbDetails.HOST,
    dialect: dbDetails.dialect,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.js").default(sequelize, DataTypes);


export default db;
