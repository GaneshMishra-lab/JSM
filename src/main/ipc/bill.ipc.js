import { ipcMain } from 'electron'
import * as billController from '../controllers/bill.controller.js'
ipcMain.handle('create-bill', async (event, { entity, billData, items }) =>
  billController.createBill({ entity, billData, items })
)
ipcMain.handle('get-all-bills', async () => billController.getAllBills())
ipcMain.handle('get-bill-by-id', async (event, billId) => billController.getBillById(billId))
ipcMain.handle('update-bill-payment', async (event, { billId, paidAmount, date, mode }) =>
  billController.updateBillPayment({ billId, paidAmount, date, mode })
)
ipcMain.handle('get-bill-payment', async (event, billId) => billController.showBillPayment(billId))
