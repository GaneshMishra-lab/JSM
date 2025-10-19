import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  createBill: ({ entity, billData, items }) =>
    ipcRenderer.invoke('create-bill', { entity, billData, items }),
  createEntity: (entityData) => ipcRenderer.invoke('create-entity', entityData),
  showdialogue: (message) => ipcRenderer.invoke('show-dialog', message),
  getAllEntities: () => ipcRenderer.invoke('get-all-entities'),
  searchEntities: (name) => ipcRenderer.invoke('search-entities', name),
  getAllBills: () => ipcRenderer.invoke('get-all-bills')
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
