import { ipcMain } from 'electron'
import * as itemStockController from '../controllers/item_stock.controller.js'

ipcMain.handle('get-all-item-stock', async () => itemStockController.getAllItemStock())
