import { useState, useEffect } from 'react'
export const useBillsDetail = (billId) => {
  const [bill, setBill] = useState(null)
  const [loading, setLoading] = useState(true)
  const [Itempurchased, setItempurchased] = useState([])
  useEffect(() => {
    const fetchBillDetails = async () => {
      try {
        const billData = await window.api.bill.getById(billId)
        setBill(billData)
        setItempurchased(billData.ItemsPurchased)
      } catch (error) {
        console.error('Error fetching bill details:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBillDetails()
  }, [billId])

  return { bill, loading, Itempurchased }
}
