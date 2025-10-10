import { Button } from '@/components/ui/button'
import PropTypes from 'prop-types'
export default function ConfirmBill({ Entity, Bill, Item, setCompleted, createBill }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Confirm Bill Details</h2>
        <div className="mb-4">
          <div>
            <strong>Name:</strong> {Entity.name}
          </div>
          <div>
            <strong>Contact:</strong> {Entity.contact}
          </div>
          <div>
            <strong>Date:</strong> {Bill.date}
          </div>
          <div>
            <strong>Rate:</strong> {Bill.rate}
          </div>
          <div>
            <strong>Amount:</strong> {Bill.bill_amt}
          </div>
          <div>
            <strong>Fine:</strong> {Bill.fine}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Items Purchased:</h3>
          <table className="min-w-full border border-gray-300 rounded">
            <thead>
              <tr>
                <th className="px-2 py-1 border">Name</th>
                <th className="px-2 py-1 border">Weight</th>
                <th className="px-2 py-1 border">Melting</th>
                <th className="px-2 py-1 border">Wastage</th>
                <th className="px-2 py-1 border">Making</th>
                <th className="px-2 py-1 border">Extra Charges</th>
                <th className="px-2 py-1 border">Amount</th>
              </tr>
            </thead>
            <tbody>
              {Item.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-2 py-1 border">{item.name}</td>
                  <td className="px-2 py-1 border">{item.weight}</td>
                  <td className="px-2 py-1 border">{item.melting}</td>
                  <td className="px-2 py-1 border">{item.wastage}</td>
                  <td className="px-2 py-1 border">{item.making}</td>
                  <td className="px-2 py-1 border">{item.extra_charges}</td>
                  <td className="px-2 py-1 border">{item.amt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-4 mt-4">
          <Button onClick={() => setCompleted(false)} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={() => {
              // createBill()
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
