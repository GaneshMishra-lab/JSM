import { ipcMain } from 'electron'
import * as itemSaleController from '../controllers/item_sale.controller.js'

ipcMain.handle('get-all-item-sale', async () => itemSaleController.getAllItemSale())
