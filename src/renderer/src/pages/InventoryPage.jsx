import { useState } from 'react'
import { useEffect } from 'react'
import { useGoldName } from '../hooks/GoldNameHook'
import { useSilverName } from '../hooks/SilverNameHook'

export default function InventoryPage() {
  const [metal, setMetal] = useState(0)
  const { goldNames } = useGoldName()

  const { silverNames } = useSilverName()
  const [selectedItem, setSelectedItem] = useState(goldNames)
  useEffect(() => {
    setSelectedItem(goldNames)
  }, [goldNames, silverNames])

  return (
    <div className="purchase-page min-h-screen w-screen flex flex-col  pt-28 items-center bg-[#171717]/90 text-zinc-200 text-xl">
      <div id="metal" className="flex max-w-fit cursor-pointer gap-2">
        <div
          className={`${metal === 0 ? 'bg-amber-400' : 'bg-zinc-600'}  px-4 py-2 rounded-2xl `}
          onClick={() => {
            setMetal(0)
            setSelectedItem(goldNames)
          }}
        >
          Gold
        </div>
        <div
          className={`${metal === 1 ? 'bg-white text-black' : 'bg-zinc-600'}  px-4 py-2 rounded-2xl `}
          onClick={() => {
            setMetal(1)
            setSelectedItem(silverNames)
          }}
        >
          Silver
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border mt-20 border-zinc-700">
        <table className="w-[40vw] min-w-full border-collapse  text-xl">
          <thead className="bg-zinc-800 text-zinc-300 sticky top-0">
            <tr>
              {['Item Name'].map((head) => (
                <th
                  key={head}
                  className="px-3 py-2 border-b border-zinc-700 cursor-default text-center font-medium"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedItem.map((item, idx) => (
              <tr
                key={idx}
                className={`hover:bg-zinc-800/70 transition ${
                  idx % 2 === 0 ? 'bg-zinc-900/50' : 'bg-zinc-900'
                }`}
              >
                <td className="px-3 py-2 border-b cursor-pointer border-zinc-800 text-center">
                  {item}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
