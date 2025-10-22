import { ipcRenderer } from 'electron'

export const entitiesAPI = {
  getAll: () => ipcRenderer.invoke('get-all-entities'),
  search: (name) => ipcRenderer.invoke('search-entities', name),
  create: (entityData) => ipcRenderer.invoke('create-entity', entityData)
}
