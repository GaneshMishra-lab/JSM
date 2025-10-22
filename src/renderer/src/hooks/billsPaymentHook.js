export const useBillPaymentUpdate = () => {
  const updateBillPayment = async ({ billId, paidAmount, date, mode }) => {
    try {
      const updatedPayment = await window.api.bill.updatePayment({ billId, paidAmount, date, mode })
      return updatedPayment
    } catch (error) {
      console.error('Error updating bill payment:', error)
      throw error
    }
  }

  return { updateBillPayment }
}
