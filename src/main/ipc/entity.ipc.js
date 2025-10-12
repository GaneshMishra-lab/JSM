import { ipcMain } from 'electron'
import * as entityController from '../controllers/entity.controller.js'

ipcMain.handle('create-entity', async (event, entityData) =>
  entityController.createEntity(entityData)
)

ipcMain.handle('get-all-entities', async () => entityController.getAllEntities())
ipcMain.handle('search-entities', async (event, name) =>
  entityController.searchEntitiesByName(name)
)
