import { sequelize } from '../database/db.js'
import { DataTypes } from 'sequelize'

export const Entity = sequelize.define('Entity', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('Supplier', 'Staff', 'Customer'),
    allowNull: false
  },
  contact: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      is: /^[0-9]{10}$/ // Ensures exactly 10 digits
    }
  }
})
