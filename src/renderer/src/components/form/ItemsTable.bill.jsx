import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import PropTypes from 'prop-types'

export default function ItemsTable({ Item, setItem, setCompleted }) {
  return (
    <div>
      <Card className="w-full max-w-full ">
        <CardHeader>
          <CardTitle>Items Purchased</CardTitle>
          <CardDescription>Enter items purchased details</CardDescription>
        </CardHeader>
        <CardContent>
          <table className="min-w-full border border-gray-700 rounded overflow-hidden">
            <thead className="bg-gray-800 text-gray-100">
              <tr>
                <th className="px-2 py-1 border">Item Name</th>
                <th className="px-2 py-1 border">Weight</th>
                <th className="px-2 py-1 border">Melting</th>
                <th className="px-2 py-1 border">Wastage</th>
                <th className="px-2 py-1 border">Making</th>
                <th className="px-2 py-1 border">Extra Charges</th>
                <th className="px-2 py-1 border">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-gray-700 text-gray-200">
              {Item.map((item, index) => (
                <tr key={index} className="border-b border-gray-600">
                  <td className="px-2 py-1 border">
                    <Input
                      type="text"
                      value={item.name}
                      onChange={(e) => {
                        setItem((prevItems) => {
                          const newItems = [...prevItems]
                          newItems[index].name = e.target.value
                          return newItems
                        })
                      }}
                      onBlur={(e) =>
                        setItem((prevItems) => {
                          const newItems = [...prevItems]
                          newItems[index].name = String(e.target.value).trim()
                          return newItems
                        })
                      }
                      placeholder="Item Name"
                    />{' '}
                  </td>
                  <td className="px-2 py-1 border">
                    <Input
                      type="number"
                      value={item.weight}
                      onChange={(e) => {
                        setItem((prevItems) => {
                          const newItems = [...prevItems]
                          newItems[index].weight = e.target.value
                          return newItems
                        })
                      }}
                      onBlur={(e) =>
                        setItem((prevItems) => {
                          const newItems = [...prevItems]
                          newItems[index].weight = String(e.target.value).trim()
                          return newItems
                        })
                      }
                      placeholder="Weight"
                    />
                  </td>
                  <td className="px-2 py-1 border">
                    <Input
                      type="number"
                      value={item.melting}
                      onChange={(e) => {
                        setItem((prevItems) => {
                          const newItems = [...prevItems]
                          newItems[index].melting = e.target.value
                          return newItems
                        })
                      }}
                      onBlur={(e) =>
                        setItem((prevItems) => {
                          const newItems = [...prevItems]
                          newItems[index].melting = String(e.target.value).trim()
                          return newItems
                        })
                      }
                      placeholder="Melting"
                    />
                  </td>
                  <td className="px-2 py-1 border">
                    <Input
                      type="number"
                      value={item.wastage}
                      onChange={(e) => {
                        setItem((prevItems) => {
                          const newItems = [...prevItems]
                          newItems[index].wastage = e.target.value
                          return newItems
                        })
                      }}
                      onBlur={(e) =>
                        setItem((prevItems) => {
                          const newItems = [...prevItems]
                          newItems[index].wastage = String(e.target.value).trim()
                          return newItems
                        })
                      }
                      placeholder="Wastage"
                    />
                  </td>
                  <td className="px-2 py-1 border">
                    <Input
                      type="number"
                      value={item.making}
                      onChange={(e) => {
                        setItem((prevItems) => {
                          const newItems = [...prevItems]
                          newItems[index].making = e.target.value
                          return newItems
                        })
                      }}
                      onBlur={(e) =>
                        setItem((prevItems) => {
                          const newItems = [...prevItems]
                          newItems[index].making = String(e.target.value).trim()
                          return newItems
                        })
                      }
                      placeholder="Making"
                    />
                  </td>
                  <td className="px-2 py-1 border">
                    <Input
                      type="number"
                      value={item.extra_charges}
                      onChange={(e) => {
                        setItem((prevItems) => {
                          const newItems = [...prevItems]
                          newItems[index].extra_charges = e.target.value
                          return newItems
                        })
                      }}
                      onBlur={(e) =>
                        setItem((prevItems) => {
                          const newItems = [...prevItems]
                          newItems[index].extra_charges = String(e.target.value).trim()
                          return newItems
                        })
                      }
                      placeholder="Extra Charges"
                    />
                  </td>
                  <td className="px-2 py-1 border">
                    <Input
                      type="number"
                      value={item.amt}
                      onChange={(e) => {
                        setItem((prevItems) => {
                          const newItems = [...prevItems]
                          newItems[index].amt = e.target.value
                          return newItems
                        })
                      }}
                      onBlur={(e) =>
                        setItem((prevItems) => {
                          const newItems = [...prevItems]
                          newItems[index].amt = String(e.target.value).trim()
                          return newItems
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.shiftKey) {
                          console.log(Item)
                          setCompleted(true)
                        } else if (e.key === 'Enter') {
                          setItem((prevItems) => [
                            ...prevItems,
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
                        }
                      }}
                      placeholder="Amount"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

ItemsTable.propTypes = {
  Item: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      melting: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      wastage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      making: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      extra_charges: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ).isRequired,
  setItem: PropTypes.func.isRequired,
  setCompleted: PropTypes.func.isRequired
}
