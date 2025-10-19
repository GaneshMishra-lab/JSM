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

export default function BillPage() {
  const nav = useNavigate()
  const { bills } = useBillsPage()
  return (
    <div className="pt-28 px-12 h-screen w-screen bg-[#171717]/95 ">
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
          <Card key={bill.id} className="dark h-fit ">
            <CardHeader>
              <CardTitle>{bill.SupplierEntity.name}</CardTitle>
              <CardDescription>{bill.ItemsPurchased[0].metal}</CardDescription>
              <CardAction>{bill.date}</CardAction>
            </CardHeader>
            <CardContent>Rate: {bill.rate}</CardContent>
            <CardFooter>
              <div className="flex gap-4 justify-between w-full">
                <div>Fine : {bill.fine}g</div>
                <div>Amount : {bill.bill_amt}</div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
