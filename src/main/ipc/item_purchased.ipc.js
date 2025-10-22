import { ipcMain } from 'electron'
import * as itemPurchasedController from '../controllers/item_purchased.controller.js'

ipcMain.handle('create-item-purchased', async (event, itemPurchasedData) =>
  itemPurchasedController.createItemPurchased(itemPurchasedData)
)
ipcMain.handle('get-all-item-purchased', async () => itemPurchasedController.getAllItemPurchased())
ipcMain.handle('get-silver-item-names', async () => itemPurchasedController.getSilverItemNames())
ipcMain.handle('get-gold-item-names', async () => itemPurchasedController.getGoldItemNames())
ipcMain.handle('get-purchased-item-count', async (event, { name, metal }) =>
  itemPurchasedController.getPurchasedItemCount({ name, metal })
)
