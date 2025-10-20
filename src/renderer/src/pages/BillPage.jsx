import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { useBillsPage } from '../hooks/billsPageHook'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PaymentsBillForm from '../components/form/PaymentsBillForm.jsx'
import PaymentBillModal from '../components/dialog/PaymentBillDetails.jsx'

export default function BillPage() {
  const nav = useNavigate()
  const { bills, fetchBills } = useBillsPage()
  const [paymentsBillFormOpen, setPaymentsBillFormOpen] = useState(false)
  const [paymentsBillDetailsOpen, setPaymentsBillDetailsOpen] = useState(false)
  const [selectedBillId, setSelectedBillId] = useState(null)
  const [amoutDetails, setAmountDetails] = useState([])
  return (
    <>
      <div className="pt-28 px-12 min-h-screen max-w-screen bg-[#171717]/95 ">
        <div className="w-full flex justify-center">
          <input
            className="mx-auto mt-2 mb-6 text-zinc-200 bg-black rounded-lg border-2 border-zinc-800 p-2"
            placeholder="Search"
            type="text"
          />
          <button
            onClick={() => nav('/add-bill')}
            className="text-zinc-200 cursor-pointer bg-blue-600  hover:font-extrabold hover:text-black rounded-2xl mt-2 mb-6 px-4 font-semibold"
          >
            New Bill
          </button>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-10 justify-start">
          {bills.map((bill) => (
            <Card key={bill.id} className="dark h-fit w-[20vw] ">
              <CardHeader>
                <CardTitle onClick={() => nav(`/bill/${bill.id}`)} className="cursor-pointer">
                  {bill.SupplierEntity.name}
                </CardTitle>
                <CardDescription>{bill.ItemsPurchased[0].metal}</CardDescription>
                <CardAction>{bill.date}</CardAction>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 justify-between w-full">
                  <div>Rate: {bill.rate}</div>
                  <div>Fine : {bill.fine}g</div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex gap-4 justify-between w-full">
                  <div>Amount : {bill.bill_amt}</div>
                  {bill.paid_amt == bill.bill_amt ? (
                    <button
                      className="text-green-500 font-bold cursor-pointer"
                      title="See payment transactions."
                      onClick={() => {
                        setPaymentsBillDetailsOpen(true)
                        setSelectedBillId(bill.id)
                      }}
                    >
                      Paid
                    </button>
                  ) : (
                    <button
                      className="bg-blue-600 px-4 py-1 rounded-lg cursor-pointer hover:text-black hover:font-extrabold "
                      title="Pay the  pending amount."
                      onClick={() => {
                        setPaymentsBillFormOpen(true)
                        setSelectedBillId(bill.id)
                        setAmountDetails([bill.bill_amt, bill.paid_amt])
                      }}
                    >
                      Pay
                    </button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      {paymentsBillFormOpen && (
        <PaymentsBillForm
          setPaymentsBillOpen={setPaymentsBillFormOpen}
          id={selectedBillId}
          amt={amoutDetails}
          onUpdate={fetchBills}
        />
      )}
      {paymentsBillDetailsOpen && (
        <PaymentBillModal id={selectedBillId} close={setPaymentsBillDetailsOpen} />
      )}
    </>
  )
}
