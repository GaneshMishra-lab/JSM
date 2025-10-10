import { Entity } from '../models/entity.model'

export const createEntity = async (entityData) => {
  try {
    const newEntity = await Entity.create(entityData)
    return newEntity
  } catch (error) {
    console.error('Error creating entity:', error)
    throw error
  }
}
