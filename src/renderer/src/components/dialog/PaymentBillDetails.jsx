import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function PaymentBillModal({ id, close }) {
  const [payment, setPayment] = useState([])

  useEffect(() => {
    const getBill = async (id) => {
      try {
        const paymentDetails = await window.api.bill.getPayment(id)
        if (paymentDetails.length == 0) console.log('no payment')
        setPayment(paymentDetails)
      } catch (error) {
        console.error('error fetching bills', error)
      }
    }
    getBill(id)
  }, [id])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-zinc-900 text-zinc-100 w-[60vw] max-h-[80vh] overflow-y-auto hide-scrollbar p-8 rounded-2xl shadow-2xl border border-zinc-700 transition-transform duration-300 ease-in-out">
        <button
          id="exit"
          className="absolute top-0 right-0 px-4 py-2 rounded-md hover:bg-red-600 text-zinc-200 transition cursour-poinnter font-bold"
          onClick={() => close(false)}
        >
          X
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center text-amber-400">
          Bill Payment Details
        </h2>

        {/* Items Table */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3 text-zinc-300">Items Purchased</h3>
          <div className="overflow-x-auto rounded-lg border border-zinc-700">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-zinc-800 text-zinc-300 sticky top-0">
                <tr>
                  {['Date', 'Amount', 'Mode'].map((head) => (
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
                {payment.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-zinc-800/70 transition ${
                      idx % 2 === 0 ? 'bg-zinc-900/50' : 'bg-zinc-900'
                    }`}
                  >
                    <td className="px-3 py-2 border-b border-zinc-800">{item.date}</td>
                    <td className="px-3 py-2 border-b border-zinc-800">{item.amt}</td>
                    <td className="px-3 py-2 border-b border-zinc-800">{item.mode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
PaymentBillModal.propTypes = {
  id: PropTypes.number.isRequired,
  close: PropTypes.func.isRequired
}
