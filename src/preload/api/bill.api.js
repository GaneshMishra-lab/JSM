import { ipcRenderer } from 'electron'

export const billApi = {
  create: ({ entity, billData, items }) =>
    ipcRenderer.invoke('create-bill', { entity, billData, items }),
  getAll: () => ipcRenderer.invoke('get-all-bills'),
  getById: (billId) => ipcRenderer.invoke('get-bill-by-id', billId),
  updatePayment: ({ billId, paidAmount, date, mode }) =>
    ipcRenderer.invoke('update-bill-payment', { billId, paidAmount, date, mode }),
  getPayment: (billId) => ipcRenderer.invoke('get-bill-payment', billId)
}
