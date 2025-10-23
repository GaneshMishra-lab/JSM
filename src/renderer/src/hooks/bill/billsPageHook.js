import { useState, useEffect } from 'react'
export const useBillsPage = () => {
  const [bills, setBills] = useState([])

  const fetchBills = async () => {
    try {
      const fetchedBills = await window.api.bill.getAll()
      setBills(fetchedBills)
    } catch (error) {
      console.error('Error fetching bills:', error)
    }
  }

  useEffect(() => {
    fetchBills()
  }, [])

  return { bills, fetchBills }
}
