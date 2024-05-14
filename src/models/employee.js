const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with your database connection details
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'employee',
  username: 'postgres',
  password: 'postgres'
});

// Define your Bank model class
class Bank extends Sequelize.Model {}

// Initialize the Bank model
Bank.init({
  bankId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  bankName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ifscCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  accNumber: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Bank'
});

module.exports = Bank;