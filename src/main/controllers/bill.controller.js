import { Bill } from '../models/bill.model'
import { Entity } from '../models/entity.model'
import { Itempurchased } from '../models/item_purchased.model'
import { sequelize } from '../database/db.js'

export const createBill = async ({ entity, billData, items }) => {
  const t = await sequelize.transaction()
  try {
    let entityRecord = await Entity.findOne({ where: { name: entity.name } })
    if (!entityRecord) {
      entityRecord = await Entity.create({ ...entity, type: 'Supplier' }, { transaction: t })
    }

    const newBill = await Bill.create(
      { ...billData, supplier: entityRecord.id },
      { transaction: t }
    )

    for (const item of items) {
      await Itempurchased.create({ ...item, bill: newBill.id }, { transaction: t })
    }
    await t.commit()
    return { success: true, billId: newBill.id }
  } catch (error) {
    await t.rollback()
    console.error('Error creating bill:', error)
    throw error
  }
}

export const getAllBills = async () => {
  try {
    const bills = await Bill.findAll({
      include: [
        { model: Entity, as: 'SupplierEntity', attributes: ['name', 'contact'] },
        { model: Itempurchased, as: 'ItemsPurchased', attributes: ['metal'] }
      ]
    })
    if (!bills) {
      return []
    }

    return bills.map((bill) => bill.toJSON())
  } catch (error) {
    console.error('Error fetching bills:', error)
  }
}
