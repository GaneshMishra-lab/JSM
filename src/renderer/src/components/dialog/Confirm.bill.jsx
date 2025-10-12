import { Button } from '@/components/ui/button'
import PropTypes from 'prop-types'

export default function ConfirmBill({ Entity, Bill, Item, setCompleted, createBill }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-zinc-900 text-zinc-100 w-[60vw] max-h-[80vh] overflow-y-auto hide-scrollbar p-8 rounded-2xl shadow-2xl border border-zinc-700 transition-transform duration-300 ease-in-out">
        <h2 className="text-2xl font-semibold mb-6 text-center text-amber-400">
          Confirm Bill Details
        </h2>

        {/* Entity & Bill Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm sm:text-base">
          <Info label="Name" value={Entity.name} />
          <Info label="Contact" value={Entity.contact || '—'} />
          <Info label="Date" value={Bill.date} />
          <Info label="Rate" value={Bill.rate} />
          <Info label="Amount" value={Bill.bill_amt} />
          <Info label="Fine" value={Bill.fine || '—'} />
        </div>

        {/* Items Table */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3 text-zinc-300">Items Purchased</h3>
          <div className="overflow-x-auto rounded-lg border border-zinc-700">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-zinc-800 text-zinc-300 sticky top-0">
                <tr>
                  {[
                    'Name',
                    'Weight',
                    'Melting',
                    'Wastage',
                    'Making',
                    'Extra Charges',
                    'Amount'
                  ].map((head) => (
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
                {Item.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-zinc-800/70 transition ${
                      idx % 2 === 0 ? 'bg-zinc-900/50' : 'bg-zinc-900'
                    }`}
                  >
                    <td className="px-3 py-2 border-b border-zinc-800">{item.name}</td>
                    <td className="px-3 py-2 border-b border-zinc-800">{item.weight}</td>
                    <td className="px-3 py-2 border-b border-zinc-800">{item.melting}</td>
                    <td className="px-3 py-2 border-b border-zinc-800">{item.wastage}</td>
                    <td className="px-3 py-2 border-b border-zinc-800">{item.making}</td>
                    <td className="px-3 py-2 border-b border-zinc-800">{item.extra_charges}</td>
                    <td className="px-3 py-2 border-b border-zinc-800 font-semibold text-amber-400">
                      {item.amt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4 border-t border-zinc-700">
          <Button
            variant="outline"
            className="text-amber-400 border-amber-400 hover:bg-amber-400 hover:text-black"
            onClick={() => setCompleted(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-amber-500 hover:bg-amber-400 text-black font-semibold"
            onClick={() => {
              console.log('Creating bill with data:', { Entity, Bill, Item })
              createBill()
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  )
}

/* Small reusable label/value component for cleaner code */
function Info({ label, value }) {
  return (
    <div>
      <span className="font-semibold text-zinc-300">{label}:</span>{' '}
      <span className="text-zinc-200">{value}</span>
    </div>
  )
}

ConfirmBill.propTypes = {
  Entity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    contact: PropTypes.string
  }).isRequired,
  Bill: PropTypes.shape({
    date: PropTypes.string.isRequired,
    rate: PropTypes.string.isRequired,
    bill_amt: PropTypes.string.isRequired,
    fine: PropTypes.string
  }).isRequired,
  Item: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      weight: PropTypes.string.isRequired,
      melting: PropTypes.string,
      wastage: PropTypes.string,
      making: PropTypes.string,
      extra_charges: PropTypes.string,
      amt: PropTypes.string.isRequired
    })
  ).isRequired,
  setCompleted: PropTypes.func.isRequired,
  createBill: PropTypes.func.isRequired
}

Info.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}
