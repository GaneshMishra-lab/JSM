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
