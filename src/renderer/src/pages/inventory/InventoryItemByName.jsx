import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SaleForm from '@/components/form/SaleForm'

export default function InventoryItemByName() {
  const { metal, name } = useParams()
  const [items, setItem] = useState([])
  const [stockFormOpen, setStockFormOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  useEffect(() => {
    const getItem = async (metal, name) => {
      try {
        const item = await window.api.stock.getItemByName({ name, metal })
        setItem(item)
      } catch (error) {
        console.error('Error fetching item:', error)
      }
    }
    getItem(metal, name)
  })
  return (
    <>
      <div className="flex flex-col min-h-screen w-screen pt-28 bg-[#171717] justify-start gap-12 items-center">
        <div className=" relative text-2xl flex w-screen  font-semibold text-zinc-200">
          <div
            className="absolute left-24 cursor-pointer bg-zinc-600 p-2  hover:bg-zinc-800 rounded-full"
            onClick={() => window.history.back()}
          >
            <ArrowLeft />
          </div>
          <div className=" absolute left-1/2 -translate-x-1/2">
            {metal}-{name}
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border border-zinc-700">
          <table className="min-w-full border-collapse text-2xl text-zinc-200">
            <thead className="bg-zinc-800 text-zinc-300 sticky top-0">
              <tr>
                {['Date', 'Weight', 'Melting', 'Amount', 'Action'].map((head) => (
                  <th
                    key={head}
                    className="px-3 py-2 border-b border-zinc-700 text-left font-medium"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-zinc-800/70 transition ${
                    idx % 2 === 0 ? 'bg-zinc-900/50' : 'bg-zinc-900'
                  }`}
                >
                  <td className="px-3 py-2 border-b border-zinc-800">{item.Stock.date}</td>
                  <td className="px-3 py-2 border-b border-zinc-800">{item.weight}</td>
                  <td className="px-3 py-2 border-b border-zinc-800">{item.melting}</td>
                  <td className="px-3 py-2 border-b border-zinc-800">{item.amt}</td>
                  <td className="px-3 py-2 border-b border-zinc-800">
                    <button
                      className="text-sm px-4 py-2 bg-zinc-600 hover:bg-zinc-800  cursor-pointer rounded-lg "
                      onClick={() => {
                        setSelectedItem(item)
                        setStockFormOpen(true)
                      }}
                    >
                      Sell
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {stockFormOpen && selectedItem && (
        <SaleForm
          id={selectedItem.id}
          purchaseDate={selectedItem.Bill.date}
          close={setStockFormOpen}
        />
      )}
    </>
  )
}
