import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useCreateStock } from '../../hooks/stock/CreateStockHook'
export default function StockForm({ id, purchaseDate, close }) {
  const today = new Date()
  const formattedDate = today.toISOString().split('T')[0]
  const [formDate, setDate] = useState(formattedDate)
  const [err, setErr] = useState(false)
  const { createStock } = useCreateStock()

  useEffect(() => {
    const checkDate = async () => {
      const fdate = new Date(formDate)
      const pdate = new Date(purchaseDate)

      if (fdate < pdate) {
        setErr(true)
      } else setErr(false)
    }
    checkDate()
  }, [formDate, purchaseDate])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-zinc-900 text-zinc-100 w-[60vw] max-h-[80vh] overflow-y-auto hide-scrollbar p-8 rounded-md shadow-2xl border border-zinc-700">
        <button
          id="exit"
          className="absolute top-0 right-0 px-4 py-2 rounded-md hover:bg-red-600 text-zinc-200 transition cursour-poinnter font-bold"
          onClick={() => close(false)}
        >
          X
        </button>
        {err && (
          <div
            id="error"
            className="absolute top-0 left-0 bg-red-400/55 border-2 border-white text-white rounded-lg p-4"
          >
            Plus Date cannot be older than Purchase Date{' '}
          </div>
        )}
        <h2 className="text-2xl font-semibold mb-6 text-center text-zinc-200">Stock date</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault()

            await createStock({ id: id, date: formDate })
            // await onUpdate()
            close(false)
          }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-zinc-300">Date</label>
            <input
              type="date"
              value={formDate}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-600"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => close(false)}
              className="px-4 py-2 rounded-md bg-zinc-700 hover:bg-zinc-600 text-zinc-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-md ${err ? ' hidden' : ''} bg-emerald-600 text-zinc-900 hover:bg-emerald-500  font-semibold`}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

StockForm.propTypes = {
  id: PropTypes.number.isRequired,
  purchaseDate: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired
}
