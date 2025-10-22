import { useParams } from 'react-router-dom'
import { useBillsDetail } from '../hooks/billsDetailHook'
export default function BillDetailsPage() {
  const { id } = useParams()
  const { bill, loading, Itempurchased } = useBillsDetail(id)
  console.log('Bill ID:', id)
  return (
    <div className="min-h-screen w-full flex justify-center items-start pt-28 px-6 md:px-12 bg-[#171717]/95 text-zinc-200">
      {loading ? (
        <div className="text-lg animate-pulse text-zinc-400">Loading...</div>
      ) : (
        <div className="bg-black/90 backdrop-blur-md p-8 rounded-2xl w-full max-w-4xl shadow-xl border border-zinc-800 ">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-4 text-zinc-100">
              Bill Details — {bill?.SupplierEntity?.name ?? 'Unknown Supplier'}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-zinc-400 text-xl">
              <p>
                <span className="font-medium text-zinc-300">Date:</span> {bill?.date}
              </p>
              <p>
                <span className="font-medium text-zinc-300">Rate:</span> {bill?.rate}
              </p>
              <p>
                <span className="font-medium text-zinc-300">Fine:</span> {bill?.fine}g
              </p>
              <p>
                <span className="font-medium text-zinc-300">Amount:</span> {bill?.bill_amt}
              </p>
              <p>
                <span className="font-medium text-zinc-300">Metal:</span>{' '}
                {Itempurchased?.[0]?.metal}
              </p>
            </div>
          </header>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Items Purchased</h2>

            <div className="overflow-x-auto rounded-lg border border-zinc-800">
              <table className="min-w-full text-sm text-left border-collapse">
                <thead className="bg-zinc-900/60 border-b border-zinc-800 text-zinc-300">
                  <tr className="text-xl">
                    <th className="py-2 px-4 font-medium">Name</th>
                    <th className="py-2 px-4 font-medium">Weight</th>
                    <th className="py-2 px-4 font-medium">Melting</th>
                    <th className="py-2 px-4 font-medium">Wastage</th>
                    <th className="py-2 px-4 font-medium">Making</th>
                    <th className="py-2 px-4 font-medium">Extra Charges</th>
                    <th className="py-2 px-4 font-medium">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {Itempurchased?.map((it, i) => (
                    <tr
                      key={it.id ?? i}
                      className={`border-b border-zinc-800  text-xl ${
                        i % 2 === 0 ? 'bg-zinc-900/40' : 'bg-zinc-800/20'
                      }`}
                    >
                      <td className="py-2 px-4">{it.name}</td>
                      <td className="py-2 px-4">{it.weight}</td>
                      <td className="py-2 px-4">{it.melting}</td>
                      <td className="py-2 px-4">{it.wastage}</td>
                      <td className="py-2 px-4">{it.making}</td>
                      <td className="py-2 px-4">{it.extra_charges}</td>
                      <td className="py-2 px-4">{it.amt}</td>
                    </tr>
                  ))}

                  <tr className="font-semibold border-t border-zinc-700 bg-zinc-900/70 text-xl">
                    <td className="py-2 px-4">Total</td>
                    <td className="py-2 px-4">
                      {Itempurchased.reduce((sum, it) => sum + Number(it.weight || 0), 0).toFixed(
                        2
                      )}
                    </td>
                    <td colSpan={4}></td>
                    <td className="py-2 px-4">
                      {Itempurchased.reduce((sum, it) => sum + Number(it.amt || 0), 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
