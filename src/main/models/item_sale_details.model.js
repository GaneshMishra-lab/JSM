// Item_sale_details [icon: user , color:blue]{
//   id integer pk
//   sale integer
//   date text
//   amt_paid integer
// }
//Item_sale.id < Item_sale_details.sale
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/db.js'
import { Itemsale } from './item_sale.model.js'

export const Itemsaledetails = sequelize.define('Item_sale_details', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sale: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Itemsale, // reference to the Itemsale table
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  date: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  amt_paid: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

Itemsaledetails.belongsTo(Itemsale, { foreignKey: 'sale', as: 'Sale' })
Itemsale.hasMany(Itemsaledetails, { foreignKey: 'sale', as: 'Payments' })
