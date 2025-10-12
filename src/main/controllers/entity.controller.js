import { Entity } from '../models/entity.model'
import { Op } from 'sequelize'

export const createEntity = async (entityData) => {
  try {
    const newEntity = await Entity.create(entityData)
    return newEntity
  } catch (error) {
    console.error('Error creating entity:', error)
    throw error
  }
}

export const getAllEntities = async () => {
  try {
    const entities = await Entity.findAll()
    return entities.map((e) => ({ name: e.name, contact: e.contact }))
  } catch (error) {
    console.error('Error fetching entities:', error)
    throw error
  }
}

export const searchEntitiesByName = async (name) => {
  try {
    const entities = await Entity.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    })
    return entities.map((e) => ({ name: e.name, contact: e.contact }))
  } catch (error) {
    console.error('Error searching entities:', error)
    throw error
  }
}
