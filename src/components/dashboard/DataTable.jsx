import { useMemo, useState } from 'react'
import { money, payments, prettyDate } from '../../data/content'

const tones = {
  Paid: 'bg-[var(--accent-soft)] text-[var(--accent)]',
  Pending: 'bg-[#f8ead0] text-[#8a5a10] dark:bg-[#3a2e12] dark:text-[#f0c14b]',
  Refunded: 'bg-[#fde4da] text-[#9a3b1d] dark:bg-[#3a2218] dark:text-[#ff8a5b]',
}

export function StatusPill({ status }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${tones[status]}`}>{status}</span>
}

export default function DataTable({ query, onSelect, selectedId }) {
  const [status, setStatus] = useState('All')
  const [sort, setSort] = useState({ key: 'date', dir: 'desc' })
  const [page, setPage] = useState(0)
  const pageSize = 5

  const rows = useMemo(() => {
    const filtered = payments.filter((row) => {
      const haystack = `${row.name} ${row.id} ${row.plan}`.toLowerCase()
      const matchesQuery = haystack.includes(query.trim().toLowerCase())
      const matchesStatus = status === 'All' || row.status === status
      return matchesQuery && matchesStatus
    })
    const sorted = [...filtered].sort((a, b) => {
      const left = a[sort.key]
      const right = b[sort.key]
      if (left < right) return sort.dir === 'asc' ? -1 : 1
      if (left > right) return sort.dir === 'asc' ? 1 : -1
      return 0
    })
    return sorted
  }, [query, sort, status])

  const pages = Math.max(1, Math.ceil(rows.length / pageSize))
  const safePage = Math.min(page, pages - 1)
  const visible = rows.slice(safePage * pageSize, safePage * pageSize + pageSize)

  function toggleSort(key) {
    setSort((current) =>
      current.key === key ? { key, dir: current.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' },
    )
  }

  return (
    <div className="min-w-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {['All', 'Paid', 'Pending', 'Refunded'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setStatus(item)
                setPage(0)
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                status === item ? 'bg-[var(--ink)] text-[var(--bg)]' : 'bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="text-sm text-[var(--muted)]">{rows.length} invoices</p>
      </div>
      <div className="mt-4 w-full max-w-full overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--line)] text-xs tracking-wide text-[var(--muted)] uppercase">
              {[
                ['id', 'Invoice'],
                ['name', 'Customer'],
                ['plan', 'Plan'],
                ['amount', 'Amount'],
                ['status', 'Status'],
                ['date', 'Date'],
              ].map(([key, label]) => (
                <th key={key} className="px-3 py-3 font-bold">
                  <button type="button" className="inline-flex items-center gap-1" onClick={() => toggleSort(key)}>
                    {label}
                    {sort.key === key ? (sort.dir === 'asc' ? '↑' : '↓') : ''}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-10 text-center text-[var(--muted)]">
                  No invoices match that search.
                </td>
              </tr>
            )}
            {visible.map((row) => (
              <tr
                key={row.id}
                onClick={() => onSelect?.(row)}
                className={`cursor-pointer border-b border-[var(--line)] transition hover:bg-[var(--surface-2)] ${
                  selectedId === row.id ? 'bg-[var(--accent-soft)]' : ''
                }`}
              >
                <td className="px-3 py-3 font-semibold">{row.id}</td>
                <td className="px-3 py-3">{row.name}</td>
                <td className="px-3 py-3">{row.plan}</td>
                <td className="px-3 py-3">{money(row.amount)}</td>
                <td className="px-3 py-3">
                  <StatusPill status={row.status} />
                </td>
                <td className="px-3 py-3 text-[var(--muted)]">{prettyDate(row.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          className="btn btn-ghost !px-3 !py-2 text-sm"
          disabled={safePage === 0}
          onClick={() => setPage((current) => Math.max(0, current - 1))}
        >
          Previous
        </button>
        <p className="text-sm text-[var(--muted)]">
          Page {safePage + 1} of {pages}
        </p>
        <button
          type="button"
          className="btn btn-ghost !px-3 !py-2 text-sm"
          disabled={safePage >= pages - 1}
          onClick={() => setPage((current) => current + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}
