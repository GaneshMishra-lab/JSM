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
  getAllBills: () => ipcRenderer.invoke('get-all-bills'),
  getBillById: (billId) => ipcRenderer.invoke('get-bill-by-id', billId),
  updateBillPayment: ({ billId, paidAmount, date, mode }) =>
    ipcRenderer.invoke('update-bill-payment', { billId, paidAmount, date, mode }),
  getBillPayment: (billId) => ipcRenderer.invoke('get-bill-payment', billId),
  getAllItemPurchased: () => ipcRenderer.invoke('get-all-item-purchased'),
  getAllItemStock: () => ipcRenderer.invoke('get-all-item-stock'),
  getAllItemSale: () => ipcRenderer.invoke('get-all-item-sale'),
  getSilverItemNames: () => ipcRenderer.invoke('get-silver-item-names'),
  getGoldItemNames: () => ipcRenderer.invoke('get-gold-item-names'),
  getPurchasedItemCount: ({ name, metal }) =>
    ipcRenderer.invoke('get-purchased-item-count', { name, metal })
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
