import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useBillPaymentUpdate } from '../../hooks/billsPaymentHook'
export default function PaymentsBillForm({ setPaymentsBillOpen, id, amt, onUpdate }) {
  const today = new Date()
  const formattedDate = today.toISOString().split('T')[0]

  const { updateBillPayment } = useBillPaymentUpdate()
  const [err, setErr] = useState(false)
  const [billPaymentDetails, setBillPaymentDetails] = useState({
    billId: id,
    date: formattedDate,
    paidAmount: amt[0] - amt[1],
    mode: 'Cash'
  })
  useEffect(() => {
    if (billPaymentDetails.paidAmount > amt[0] - amt[1]) {
      setErr(true)
    } else setErr(false)
  }, [billPaymentDetails.paidAmount, amt])
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-zinc-900 text-zinc-100 w-[60vw] max-h-[80vh] overflow-y-auto hide-scrollbar p-8 rounded-md shadow-2xl border border-zinc-700 transition-transform duration-300 ease-in-out">
        <button
          id="exit"
          className="absolute top-0 right-0 px-4 py-2 rounded-md hover:bg-red-600 text-zinc-200 transition cursour-poinnter font-bold"
          onClick={() => setPaymentsBillOpen(false)}
        >
          X
        </button>
        {err && (
          <div
            id="error"
            className="absolute top-0 left-0 bg-red-400/55 border-2 border-white text-white rounded-lg p-4"
          >
            Paid amount cannot exceed bill amount{' '}
          </div>
        )}
        <h2 className="text-2xl font-semibold mb-6 text-center text-zinc-200">
          Payments Bill Details
        </h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault()

            await updateBillPayment(billPaymentDetails)
            await onUpdate()
            setPaymentsBillOpen(false)
          }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-zinc-300">Date</label>
            <input
              type="date"
              value={billPaymentDetails.date}
              onChange={(e) => setBillPaymentDetails((p) => ({ ...p, date: e.target.value }))}
              className="mt-1 w-full bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300">Amount</label>
            <input
              type="number"
              step="0.01"
              value={billPaymentDetails.paidAmount}
              onChange={(e) =>
                setBillPaymentDetails((p) => ({ ...p, paidAmount: Number(e.target.value) }))
              }
              className="mt-1 w-full bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-600"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300">Mode</label>
            <select
              value={billPaymentDetails.mode}
              onChange={(e) => setBillPaymentDetails((p) => ({ ...p, mode: e.target.value }))}
              className="mt-1 w-full bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-600"
            >
              <option value="Cash">Cash</option>
              <option value="Online">Onlie</option>
              <option value="Fine">FIne</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setPaymentsBillOpen(false)}
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
PaymentsBillForm.propTypes = {
  setPaymentsBillOpen: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  amt: PropTypes.arrayOf(PropTypes.number).isRequired,
  onUpdate: PropTypes.func.isRequired
}
