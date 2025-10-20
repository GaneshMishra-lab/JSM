import { Bill } from '../models/bill.model'
import { Entity } from '../models/entity.model'
import { Itempurchased } from '../models/item_purchased.model'
import { sequelize } from '../database/db.js'
import { Billpayment } from '../models/bill_payment.model'

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

export const getBillById = async (billId) => {
  try {
    const bill = await Bill.findByPk(billId, {
      include: [
        { model: Entity, as: 'SupplierEntity', attributes: ['name', 'contact'] },
        { model: Itempurchased, as: 'ItemsPurchased' }
      ]
    })
    if (!bill) {
      return null
    }
    return bill.toJSON()
  } catch (error) {
    console.error('Error fetching bill by ID:', error)
    throw error
  }
}

export const updateBillPayment = async ({ billId, paidAmount, date, mode }) => {
  let t = await sequelize.transaction()
  try {
    const bill = await Bill.findByPk(billId, { transaction: t })
    if (!bill) {
      throw new Error('Bill not found')
    }
    if (bill.paid_amt + paidAmount > bill.bill_amt) {
      throw new Error('Payment exceeds bill amount')
    }
    bill.paid_amt += paidAmount
    await bill.save({ transaction: t })
    const billpayment = await Billpayment.create(
      {
        bill: billId,
        date: date,
        amt: paidAmount,
        mode: mode
      },
      { transaction: t }
    )
    await t.commit()
    return billpayment.toJSON()
  } catch (error) {
    t.rollback()
    console.error('Error updating bill payment:', error)
    throw error
  }
}

// show billPayment
export const showBillPayment = async (billId) => {
  try {
    const payment = await Billpayment.findAll({
      where: {
        bill: billId
      }
    })

    // return JSON.parse(JSON.stringify(payment))
    return payment.map((p) => p.toJSON())
  } catch (error) {
    console.error('error finding bill', error)
  }
}
