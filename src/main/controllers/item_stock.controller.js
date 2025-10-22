import { Itemstock } from '../models/item_stock.model.js'
import { Itempurchased } from '../models/item_purchased.model.js'
export const getAllItemStock = async () => {
  try {
    const itemStock = await Itemstock.findAll({
      include: [{ model: Itempurchased, as: 'Item' }]
    })
    return itemStock.map((item) => item.toJSON())
  } catch (error) {
    console.error('Error fetching item stock:', error)
    throw error
  }
}

export const createItemStock = async ({ date, id }) => {
  try {
    const item = await Itempurchased.findByPk(id)
    if (!item) {
      throw new Error('Item not found')
    }
    const previousStock = await Itempurchased.findOne({
      where: {
        name: item.name,
        metal: item.metal
      },
      include: [{ model: Itemstock, as: 'Stock' }],
      order: [[{ model: Itemstock, as: 'Stock' }, 'label', 'DESC']]
    })
    const newStock = await Itemstock.create({
      date: date,
      label: previousStock.Stock ? previousStock.Stock.label + 1 : 1,
      item: id,
      status: 'stock'
    })

    return newStock.toJSON()
  } catch (error) {
    console.error('Error creating item stock:', error)
    throw error
  }
}
