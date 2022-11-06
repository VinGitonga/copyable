export default function createSequelizeModelInSingleStore({
  sequelize,
  modelName,
  fields,
  tableName,
}) {
  const customModel = sequelize.define(modelName, fields, {
    tableName,
    timestamps: false,
  })

  return customModel
}
