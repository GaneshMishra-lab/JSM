import { ipcRenderer } from 'electron'

export const saleApi = {
  getAllItem: () => ipcRenderer.invoke('get-all-item-sale')
}
