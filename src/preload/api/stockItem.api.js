import { ipcRenderer } from 'electron'

export const stockApi = {
  getAll: () => ipcRenderer.invoke('get-all-item-stock'),
  create: ({ date, id }) => ipcRenderer.invoke('create-item-stock', { date, id })
}
