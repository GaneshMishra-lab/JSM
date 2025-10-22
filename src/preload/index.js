import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { entitiesAPI } from './api/entity.api'
import { billApi } from './api/bill.api'
import { stockApi } from './api/stockItem.api'
import { purchaseApi } from './api/purchaseItem.api'
import { saleApi } from './api/sale.api'

// Custom APIs for renderer
const api = {
  showdialogue: (message) => ipcRenderer.invoke('show-dialog', message),
  bill: billApi,
  entity: entitiesAPI,
  purchase: purchaseApi,
  sale: saleApi,
  stock: stockApi
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
