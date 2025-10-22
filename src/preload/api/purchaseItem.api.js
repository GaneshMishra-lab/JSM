import { ipcRenderer } from 'electron'

export const purchaseApi = {
  getAll: () => ipcRenderer.invoke('get-all-item-purchased'),
  getSilverItemNames: () => ipcRenderer.invoke('get-silver-item-names'),
  getGoldItemNames: () => ipcRenderer.invoke('get-gold-item-names'),
  getItemCount: ({ name, metal }) => ipcRenderer.invoke('get-purchased-item-count', { name, metal })
}
