export const useCreateStock = () => {
  const createStock = async (stockData) => {
    try {
      const newStock = await window.api.stock.create(stockData)
      return newStock
    } catch (error) {
      console.error('Error creating stock:', error)
      throw error
    }
  }
  return { createStock }
}
