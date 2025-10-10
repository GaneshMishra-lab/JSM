import { ipcMain } from 'electron'
import * as entityController from '../controllers/entity.controller.js'

ipcMain.handle('create-entity', async (event, entityData) =>
  entityController.createEntity(entityData)
)
