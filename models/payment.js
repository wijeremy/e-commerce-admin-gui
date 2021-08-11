const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Payment extends Model {}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'payment',
  }
);

<<<<<<< HEAD
module.exports = payment;
=======
module.exports = Payment;
>>>>>>> main
