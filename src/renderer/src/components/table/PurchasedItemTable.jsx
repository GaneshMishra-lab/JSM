import PropType from 'prop-types'

export default function PurchasedItemTable({ data }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-700">
      <table className="min-w-full border-collapse text-sm">
        <thead className="bg-zinc-800 text-zinc-300 sticky top-0">
          <tr>
            {['Date', 'Weight', 'Amount'].map((head) => (
              <th key={head} className="px-3 py-2 border-b border-zinc-700 text-left font-medium">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
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
  )
}
PurchasedItemTable.propTypes = {
  data: PropType.arrayof(PropType.Object).isRequired
}
