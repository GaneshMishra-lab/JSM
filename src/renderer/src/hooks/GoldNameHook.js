import { useState, useEffect } from 'react'
export const useGoldName = () => {
  const [goldNames, setGoldNames] = useState([])

  useEffect(() => {
    const fetchGoldNames = async () => {
      try {
        const goldNamesData = await window.api.getGoldItemNames()
        setGoldNames(goldNamesData)
      } catch (error) {
        console.error('Error fetching gold names:', error)
      }
    }
    fetchGoldNames()
  }, [])

  return { goldNames }
}
