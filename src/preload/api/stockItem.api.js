import { ipcRenderer } from 'electron'

export const stockApi = {
  getAll: () => ipcRenderer.invoke('get-all-item-stock')
}
