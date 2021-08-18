const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class OrderDetails extends Model {}

OrderDetails.init(
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
    modelName: 'order_details',
  }
);

module.exports = OrderDetails;
