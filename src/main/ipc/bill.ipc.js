import { ipcMain } from 'electron'
import * as billController from '../controllers/bill.controller.js'
ipcMain.handle('create-bill', async (event, { entity, billData, items }) =>
  billController.createBill({ entity, billData, items })
)
