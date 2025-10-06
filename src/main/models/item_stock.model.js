// Item_stock [icon: user, color: blue]{
//   id integer pk
//   date text
//   label integer
//   item integer
//   status enum(stock , sold )
// }
// Item_purchased.id - Item_stock.item

import { DataTypes } from 'sequelize'
import { sequelize } from '../database/db.js'
import { Itempurchased } from './item_purchased.model.js'

export const Itemstock = sequelize.define('Item_stock', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  label: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  item: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Itempurchased, // reference to the Itempurchased table
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  status: {
    type: DataTypes.ENUM('stock', 'sold'),
    allowNull: false
  }
})

Itemstock.belongsTo(Itempurchased, { foreignKey: 'item', as: 'Item' })
Itempurchased.hasOne(Itemstock, { foreignKey: 'item', as: 'Stock' })
