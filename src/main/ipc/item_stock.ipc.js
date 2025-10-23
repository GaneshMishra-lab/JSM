import { ipcMain } from 'electron'
import * as itemStockController from '../controllers/item_stock.controller.js'

ipcMain.handle('get-all-item-stock', async () => itemStockController.getAllItemStock())
ipcMain.handle('create-item-stock', async (event, { date, id }) =>
  itemStockController.createItemStock({ date, id })
)
ipcMain.handle('get-item-stock-summary', async (event, { name, metal }) =>
  itemStockController.getStockedItemSummary({ name, metal })
)
ipcMain.handle('get-item-stock-by-name', async (event, { name, metal }) =>
  itemStockController.getStockedItemByName({ name, metal })
)
