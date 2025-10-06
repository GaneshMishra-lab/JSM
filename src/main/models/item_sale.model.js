// Item_sale [icon: user , color:blue]{
//   id integer pk
//   date text
//   customer integer
//   item integer
//   amt integer
//   paid_amt integer
// }
// Item_stock.id - Item_sale.item
// Entity.id < Item_sale.customer
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/db.js'
import { Entity } from './entity.model.js'
import { Itemstock } from './item_stock.model.js'

export const Itemsale = sequelize.define('Item_sale', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  customer: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Entity, // reference to the Entity table
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  item: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Itemstock, // reference to the Itemstock table
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  amt: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  paid_amt: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

Itemsale.belongsTo(Entity, { foreignKey: 'customer', as: 'Customer' })
// Entity.hasMany(Itemsale, { foreignKey: 'customer', as: 'Purchases' })

Itemsale.belongsTo(Itemstock, { foreignKey: 'item', as: 'Item' })
Itemstock.hasOne(Itemsale, { foreignKey: 'item', as: 'Sale' })
