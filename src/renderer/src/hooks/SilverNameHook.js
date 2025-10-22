import { useState, useEffect } from 'react'
export const useSilverName = () => {
  const [silverNames, setSilverNames] = useState([])

  useEffect(() => {
    const fetchSilverNames = async () => {
      try {
        const silverNamesData = await window.api.purchase.getSilverItemNames()
        setSilverNames(silverNamesData)
      } catch (error) {
        console.error('Error fetching gold names:', error)
      }
    }
    fetchSilverNames()
  }, [])

  return { silverNames }
}
