import { ipcRenderer } from 'electron'

export const stockApi = {
  getAll: () => ipcRenderer.invoke('get-all-item-stock'),
  create: ({ date, id }) => ipcRenderer.invoke('create-item-stock', { date, id }),
  getItemSummary: ({ name, metal }) =>
    ipcRenderer.invoke('get-item-stock-summary', { name, metal }),
  getItemByName: ({ name, metal }) => ipcRenderer.invoke('get-item-stock-by-name', { name, metal })
}
