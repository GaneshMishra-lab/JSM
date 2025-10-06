import { DataTypes } from 'sequelize'
import { sequelize } from '../database/db.js'
import { Entity } from './entity.model.js'

export const Bill = sequelize.define(
  'Bill',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    supplier: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Entity, // reference to the Entity table
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    date: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rate: {
      type: DataTypes.REAL,
      allowNull: false
    },
    bill_amt: {
      type: DataTypes.REAL,
      allowNull: false
    },
    fine: {
      type: DataTypes.REAL,
      allowNull: true
    },
    paid_amt: {
      type: DataTypes.REAL,
      allowNull: true
    }
  },
  {
    tableName: 'Bill',
    timestamps: false
  }
)

// const bills = await Bill.findAll({
//   include: { model: Entity, as: 'SupplierEntity' }
// });
Bill.belongsTo(Entity, { foreignKey: 'supplier', as: 'SupplierEntity' })
