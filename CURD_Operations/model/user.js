const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Employee = sequelize.define("Employee", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  department: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: "employees",
  timestamps: false
});

module.exports = Employee;
