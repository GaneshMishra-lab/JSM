import { DataTypes } from 'sequelize'
import { sequelize } from '../database/db.js'
import { Bill } from './bill.model.js'

export const Billpayment = sequelize.define('Bill_payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bill: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Bill, // reference to the Bill table
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  date: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  amt: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mode: {
    type: DataTypes.ENUM('Cash', 'Online', 'Fine'),
    allowNull: false
  }
})

Billpayment.belongsTo(Bill, { foreignKey: 'bill', as: 'Bill' })
Bill.hasMany(Billpayment, { foreignKey: 'bill', as: 'Payments' })
