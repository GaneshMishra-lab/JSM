import { ipcMain } from 'electron'
import * as itemPurchasedController from '../controllers/item_purchased.controller.js'

ipcMain.handle('create-item-purchased', async (event, itemPurchasedData) =>
  itemPurchasedController.createItemPurchased(itemPurchasedData)
)
