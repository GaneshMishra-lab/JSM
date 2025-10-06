// Item_purchased [icon: user, color: blue]{
//   id integer pk
//   bill integer
//   name text
//   metal enum(Gold ,Silver)
//   weight real
//   melting real
//   wastage real
//   making real
//   extra_charges real
//   amt real
//   order integer

// }
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/db.js'
import { Bill } from './bill.model.js'

export const Itempurchased = sequelize.define('Item_purchased', {
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
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  metal: {
    type: DataTypes.ENUM('Gold', 'Silver'),
    allowNull: false
  },
  weight: {
    type: DataTypes.REAL,
    allowNull: false
  },
  melting: {
    type: DataTypes.REAL,
    allowNull: false
  },
  wastage: {
    type: DataTypes.REAL,
    allowNull: false
  },
  making: {
    type: DataTypes.REAL,
    allowNull: true
  },
  extra_charges: {
    type: DataTypes.REAL,
    allowNull: true
  },
  amt: {
    type: DataTypes.REAL,
    allowNull: false
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
})

Itempurchased.belongsTo(Bill, { foreignKey: 'bill', as: 'Bill' })
Bill.hasMany(Itempurchased, { foreignKey: 'bill', as: 'ItemsPurchased' })
