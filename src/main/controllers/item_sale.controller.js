import { Itempurchased } from '../models/item_purchased.model'
import { Itemsale } from '../models/item_sale.model.js'
import { Itemstock } from '../models/item_stock.model'
export const getAllItemSale = async () => {
  try {
    const itemSale = await Itemsale.findAll({
      include: [{ model: Itemstock, as: 'Item', include: [{ model: Itempurchased, as: 'Item' }] }]
    })
    return itemSale.map((item) => item.toJSON())
  } catch (error) {
    console.error('Error fetching item sale:', error)
    throw error
  }
}
