import { ipcRenderer } from 'electron'

export const purchaseApi = {
  getAll: () => ipcRenderer.invoke('get-all-item-purchased'),
  getSilverItemNames: () => ipcRenderer.invoke('get-silver-item-names'),
  getGoldItemNames: () => ipcRenderer.invoke('get-gold-item-names'),
  getItemByName: ({ name, metal }) =>
    ipcRenderer.invoke('get-purchased-item-by-name', { name, metal }),
  getItemSummary: ({ name, metal }) =>
    ipcRenderer.invoke('get-purchased-item-summary', { name, metal })
}
