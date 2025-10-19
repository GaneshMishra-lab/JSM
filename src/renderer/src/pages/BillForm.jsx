import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import ItemsTable from './ItemsTable.bill'
import ConfirmBill from '../dialog/confirm.bill'

export default function BillForm() {
  const [completed, setCompleted] = useState(false)
  const [Item, setItem] = useState([
    {
      name: '',
      weight: '',
      melting: '',
      wastage: '',
      making: '',
      extra_charges: '',
      amt: ''
    }
  ])
  const [Entity, setEntity] = useState({
    name: '',
    contact: ''
  })
  const [Bill, setBill] = useState({
    date: '',
    rate: '',
    bill_amt: '',
    fine: ''
  })
  const createBill = async () => {
    // helper to trim string values safely
    const sanitizeString = (v) => (typeof v === 'string' ? v.trim() : v)
    // create a sanitized copy of the data to send (won't mutate state)
    const payload = {
      entity: {
        name: sanitizeString(Entity.name),
        contact: sanitizeString(Entity.contact)
      },
      billData: {
        date: sanitizeString(Bill.date),
        rate: sanitizeString(Bill.rate),
        bill_amt: sanitizeString(Bill.bill_amt),
        fine: sanitizeString(Bill.fine)
      },
      items: Item.map((it) => ({
        name: sanitizeString(it.name),
        weight: sanitizeString(it.weight),
        melting: sanitizeString(it.melting),
        wastage: sanitizeString(it.wastage),
        making: sanitizeString(it.making),
        extra_charges: sanitizeString(it.extra_charges),
        amt: sanitizeString(it.amt)
      }))
    }
    try {
      // send sanitized payload to the main process
      const response = await window.api.createBill({
        entity: payload.entity,
        billData: payload.billData,
        items: payload.items
      })
      if (response.success) {
        await window.api.showdialogue(`Bill created successfully with ID: ${response.billId}`)
        // Reset form after successful creation
        setEntity({ name: '', contact: '' })
        setBill({ bill_amt: '', rate: '', date: '', fine: '' })
        setItem([
          {
            name: '',
            weight: '',
            melting: '',
            wastage: '',
            making: '',
            extra_charges: '',
            amt: ''
          }
        ])
        setCompleted(false)
      } else {
        await window.api.showdialogue('Failed to create bill.')
      }
    } catch (error) {
      console.error('Error creating bill:', error)
      await window.api.showdialogue('An error occurred while creating the bill.')
    }
  }

  return (
    <>
      <div className="dark flex-col justify-start items-start h-screen w-screen bg-[#171717]/95 ">
        <Card className="w-full max-w-full">
          <CardHeader>
            <CardTitle>Bill Form</CardTitle>
            <CardDescription>Enter Bill details</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="ename">Name</Label>
                  <Input
                    id="ename"
                    name="ename"
                    type="text"
                    placeholder="Supplier Name"
                    required
                    value={Entity.name}
                    onChange={(e) => {
                      setEntity((prev) => ({ ...prev, name: e.target.value }))
                    }}
                    onBlur={(e) => setEntity((prev) => ({ ...prev, name: e.target.value.trim() }))}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="econtact">Contact</Label>
                  <Input
                    id="econtact"
                    name="econtact"
                    type="number"
                    placeholder="Suppliers Number"
                    value={Entity.contact}
                    onChange={(e) => {
                      setEntity((prev) => ({ ...prev, contact: e.target.value }))
                    }}
                    required
                    onBlur={(e) =>
                      setEntity((prev) => ({
                        ...prev,
                        contact: String(e.target.value).trim()
                      }))
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bdate">Date</Label>
                  <Input
                    id="bdate"
                    name="bdate"
                    type="date"
                    placeholder="Enter bill date"
                    value={Bill.date}
                    onChange={(e) => {
                      setBill((prev) => ({ ...prev, date: e.target.value }))
                    }}
                    required
                    onBlur={(e) =>
                      setBill((prev) => ({
                        ...prev,
                        date: String(e.target.value).trim()
                      }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="grid gap-2">
                  <Label htmlFor="brate">Rate</Label>
                  <Input
                    id="brate"
                    name="brate"
                    type="number"
                    placeholder="Enter bill rate"
                    value={Bill.rate}
                    onChange={(e) => {
                      setBill((prev) => ({ ...prev, rate: e.target.value }))
                    }}
                    required
                    onBlur={(e) =>
                      setBill((prev) => ({
                        ...prev,
                        rate: String(e.target.value).trim()
                      }))
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bamt">Bill Amount</Label>
                  <Input
                    id="bamt"
                    name="bamt"
                    type="number"
                    step="0.01"
                    placeholder="Bill Amount"
                    value={Bill.bill_amt}
                    onChange={(e) => {
                      setBill((prev) => ({ ...prev, bill_amt: e.target.value }))
                    }}
                    required
                    onBlur={(e) =>
                      setBill((prev) => ({
                        ...prev,
                        bill_amt: String(e.target.value).trim()
                      }))
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bfine">Fine</Label>
                  <Input
                    id="bfine"
                    name="bfine"
                    type="number"
                    step="0.01"
                    placeholder="Bill Fine"
                    value={Bill.fine}
                    onChange={(e) => {
                      setBill((prev) => ({ ...prev, fine: e.target.value }))
                    }}
                    required
                    onBlur={(e) =>
                      setBill((prev) => ({
                        ...prev,
                        fine: String(e.target.value).trim()
                      }))
                    }
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2"></CardFooter>
        </Card>
        <ItemsTable Item={Item} setItem={setItem} setCompleted={setCompleted} />
      </div>
      {completed && (
        <ConfirmBill
          Entity={Entity}
          Bill={Bill}
          Item={Item}
          setCompleted={setCompleted}
          createBill={createBill}
        />
      )}
    </>
  )
}
