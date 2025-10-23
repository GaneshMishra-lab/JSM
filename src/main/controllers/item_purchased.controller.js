import { Sequelize } from 'sequelize'
import { Bill } from '../models/bill.model'
import { Itempurchased } from '../models/item_purchased.model'
import { Itemstock } from '../models/item_stock.model'

export const createItemPurchased = async (itemPurchasedData) => {
  try {
    const newItemPurchased = await Itempurchased.create(itemPurchasedData)
    return newItemPurchased
  } catch (error) {
    console.error('Error creating item purchased:', error)
    throw error
  }
}

export const getAllItemPurchased = async () => {
  try {
    const itemPurchased = await Itempurchased.findAll({
      include: [{ model: Itemstock, as: 'Stock' }],
      where: {
        '$stock.id$': null
      }
    })

    return itemPurchased.map((item) => item.toJSON())
  } catch (error) {
    console.error('Error fetching item purchased:', error)
    throw error
  }
}

export const getSilverItemNames = async () => {
  try {
    const items = await Itempurchased.findAll({
      attributes: ['name'],
      group: ['name'],
      where: {
        metal: 'Silver'
      }
    })
    return items.map((item) => item.name)
  } catch (error) {
    console.error('Error fetching item names:', error)
    throw error
  }
}

export const getGoldItemNames = async () => {
  try {
    const items = await Itempurchased.findAll({
      attributes: ['name'],
      group: ['name'],
      where: {
        metal: 'Gold'
      }
    })
    return items.map((item) => item.name)
  } catch (error) {
    console.error('Error fetching item names:', error)
    throw error
  }
}


export const getPurchasedItemSummary = async ({ name, metal }) => {
  try {
    const summary = await Itempurchased.findOne({
      include: [{ model: Itemstock, as: 'Stock' }],
      where: {
        name: name,
        metal: metal,
        '$Stock.id$': null
      },
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('Item_purchased.id')), 'count'],
        [Sequelize.fn('SUM', Sequelize.col('Item_purchased.weight')), 'total_weight']
      ],
      raw: true
    })
    return summary
  } catch (error) {
    console.error('Error fetching item count:', error)
    throw error
  }
}

export const getPurchasedItemByName = async ({ name, metal }) => {
  try {
    const item = await Itempurchased.findAll({
      include: [
        { model: Itemstock, as: 'Stock' },
        { model: Bill, as: 'Bill' }
      ],
      where: {
        name: name,
        metal: metal,
        '$stock.id$': null
      }
    })
    return item.map((item) => item.toJSON())
  } catch (error) {
    console.error('Error fetching item:', error)
    throw error
  }
}
