export default function singlestoreDbDetails(sequelize, DataTypes) {
  const SingleStoreDbModel = sequelize.define(
    'singlestoredb',
    {
      dbName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dbHost: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      dbOwner: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  )

  return SingleStoreDbModel
}
