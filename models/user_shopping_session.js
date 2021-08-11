const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class UserShoppingSession extends Model {}

UserShoppingSession.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    total: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_shopping_session',
  }
);

module.exports = UserShoppingSession;
