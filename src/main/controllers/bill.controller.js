import { Bill } from '../models/bill.model'

export const createBill = async (billData) => {
  try {
    const newBill = await Bill.create(billData)
    return newBill
  } catch (error) {
    console.error('Error creating bill:', error)
    throw error
  }
}
