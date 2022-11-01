export default function migrationCustomModel({
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
