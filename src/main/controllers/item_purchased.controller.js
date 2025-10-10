import { Itempurchased } from '../models/item_purchased.model'

export const createItemPurchased = async (itemPurchasedData) => {
  try {
    const newItemPurchased = await Itempurchased.create(itemPurchasedData)
    return newItemPurchased
  } catch (error) {
    console.error('Error creating item purchased:', error)
    throw error
  }
}
