import { useEffect, useState } from 'react'
import DataTable, { StatusPill } from '../components/dashboard/DataTable'
import { PlanMix, RevenueChart, WeeklyChart } from '../components/dashboard/Charts'
import Sidebar from '../components/dashboard/Sidebar'
import Topbar from '../components/dashboard/Topbar'
import Icon from '../components/Icon'
import ThemeToggle from '../components/ThemeToggle'
import { useTheme } from '../context/ThemeContext'
import { activity, channels, funnel, invoices, money } from '../data/content'

const titles = {
  overview: 'Overview',
  analytics: 'Analytics',
  customers: 'Customers',
  billing: 'Billing',
  settings: 'Settings',
}

function Stat({ label, value, delta, up = true }) {
  return (
    <article className="lift panel p-5">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="font-display mt-2 text-3xl tracking-tight">{value}</p>
      <p className={`mt-2 text-sm font-bold ${up ? 'text-[var(--accent)]' : 'text-[var(--sienna)]'}`}>{delta}</p>
    </article>
  )
}

function Overview({ query, onToast }) {
  const [range, setRange] = useState('30d')
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-w-0 space-y-4">
      <div className="photo-frame relative h-36 w-full overflow-hidden rounded-[24px] sm:h-44">
        <img src="/images/hero-studio.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10211c]/80 via-[#10211c]/35 to-transparent" />
        <div className="absolute bottom-4 left-5 text-[#f6f1e8]">
          <p className="text-xs font-bold tracking-[0.16em] uppercase text-[#e2b657]">Northwind</p>
          <p className="font-display text-2xl sm:text-3xl">This week’s room</p>
        </div>
      </div>
      <div className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Collected" value="$128,430" delta="+12.4% vs last month" />
        <Stat label="Open pipeline" value="$46,200" delta="6 proposals in motion" />
        <Stat label="Active retainers" value="18" delta="+2 this week" />
        <Stat label="Margin" value="41%" delta="-1.2 pts, still inside band" up={false} />
      </div>
      <div className="grid w-full min-w-0 gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className="panel min-w-0 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Revenue against forecast</h2>
              <p className="text-sm text-[var(--muted)]">Thousands of dollars</p>
            </div>
            <div className="flex rounded-full bg-[var(--surface-2)] p-1">
              {['7d', '30d', '90d'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setRange(item)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                    range === item ? 'bg-[var(--ink)] text-[var(--bg)]' : 'text-[var(--muted)]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <RevenueChart range={range} />
        </section>
        <section className="panel p-5">
          <h2 className="text-lg font-bold">Plan mix</h2>
          <PlanMix />
          <ul className="space-y-2">
            {[
              ['Scale', '62%', 'var(--accent)'],
              ['Studio', '28%', 'var(--sienna)'],
              ['Starter', '10%', 'var(--gold)'],
            ].map(([name, value, color]) => (
              <li key={name} className="flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-2">
                  <i className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
                  {name}
                </span>
                <span className="font-bold">{value}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="grid w-full min-w-0 gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)]">
        <section className="panel min-w-0 p-5">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent invoices</h2>
            <button type="button" className="btn btn-ghost !px-3 !py-2 text-sm" onClick={() => onToast('Report queued for download')}>
              Export
            </button>
          </div>
          <DataTable query={query} selectedId={selected?.id} onSelect={setSelected} />
          {selected && (
            <div className="mt-4 rounded-2xl bg-[var(--surface-2)] p-4">
              <p className="text-sm text-[var(--muted)]">Selected</p>
              <p className="mt-1 font-bold">
                {selected.name} · {selected.id}
              </p>
              <p className="text-sm text-[var(--muted)]">
                {selected.plan} plan · {money(selected.amount)} · {selected.status}
              </p>
            </div>
          )}
        </section>
        <section className="panel p-5">
          <h2 className="text-lg font-bold">Activity</h2>
          <ul className="mt-4 space-y-4">
            {activity.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-[var(--muted)]">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

function Analytics() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="min-w-0 space-y-4">
      <div className="grid w-full gap-4 sm:grid-cols-3">
        <Stat label="Win rate" value="37%" delta="+4 pts this quarter" />
        <Stat label="Cycle time" value="11 days" delta="2 days faster" />
        <Stat label="Response" value="3.4 hrs" delta="Inside the band" />
      </div>
      <section className="panel p-5">
        <h2 className="text-lg font-bold">Work closed this week</h2>
        <WeeklyChart />
      </section>
      <div className="grid w-full gap-4 lg:grid-cols-2">
        <section className="panel p-5">
          <h2 className="text-lg font-bold">Where work comes from</h2>
          <ul className="mt-5 space-y-4">
            {channels.map((channel) => (
              <li key={channel.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-semibold">{channel.name}</span>
                  <span className="text-[var(--muted)]">{channel.value}</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--surface-2)]">
                  <div
                    className="h-2 rounded-full bg-[var(--accent)] transition-all duration-700"
                    style={{ width: ready ? `${channel.value}%` : '0%' }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="panel p-5">
          <h2 className="text-lg font-bold">Pipeline funnel</h2>
          <ul className="mt-5 space-y-3">
            {funnel.map((step, index) => (
              <li
                key={step.name}
                className="flex items-center justify-between rounded-2xl bg-[var(--surface-2)] px-4 py-3"
                style={{ marginRight: `${index * 8}%` }}
              >
                <span className="font-semibold">{step.name}</span>
                <span className="font-display text-2xl">{step.value}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

function Customers({ query }) {
  const [selected, setSelected] = useState(null)
  return (
    <section className="panel w-full min-w-0 p-5">
      <h2 className="text-lg font-bold">Customer ledger</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">Search, filter, sort, and open a row for the detail.</p>
      <div className="mt-4">
        <DataTable query={query} selectedId={selected?.id} onSelect={setSelected} />
      </div>
    </section>
  )
}

function Billing({ onToast }) {
  return (
    <div className="grid w-full gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="panel p-6">
        <p className="text-sm text-[var(--muted)]">Current plan</p>
        <h2 className="font-display mt-2 text-4xl">Studio</h2>
        <p className="mt-2 text-[var(--muted)]">$79 per seat · billed monthly · 8 seats</p>
        <div className="mt-6 space-y-4">
          {[
            ['Seats', 8, 12],
            ['Client rooms', 14, 20],
            ['Storage', 42, 100],
          ].map(([label, used, total]) => (
            <div key={label}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{label}</span>
                <span className="font-semibold">
                  {used}/{total}
                </span>
              </div>
              <div className="h-2 rounded-full bg-[var(--surface-2)]">
                <div className="h-2 rounded-full bg-[var(--accent)]" style={{ width: `${(used / total) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
        <button type="button" className="btn btn-primary mt-6" onClick={() => onToast('Plan change saved as a draft')}>
          Adjust plan
        </button>
      </section>
      <section className="panel p-6">
        <h2 className="text-lg font-bold">Invoices</h2>
        <ul className="mt-4 divide-y divide-[var(--line)]">
          {invoices.map((invoice) => (
            <li key={invoice.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div>
                <p className="font-bold">{invoice.client}</p>
                <p className="text-sm text-[var(--muted)]">
                  {invoice.id} · {invoice.date}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusPill status={invoice.status} />
                <span className="font-bold">{money(invoice.amount)}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function Settings({ user, onToast }) {
  const { theme } = useTheme()
  const [form, setForm] = useState({ name: user.name, email: user.email, studio: 'Northwind' })
  const [toggles, setToggles] = useState({ alerts: true, digest: false, clients: true })

  return (
    <div className="grid w-full gap-4 xl:grid-cols-2">
      <section className="panel p-6">
        <h2 className="text-lg font-bold">Profile</h2>
        <div className="mt-5 space-y-4">
          {[
            ['name', 'Name'],
            ['email', 'Email'],
            ['studio', 'Studio'],
          ].map(([key, label]) => (
            <label key={key} className="block text-sm font-bold">
              {label}
              <input
                className="field mt-2 font-medium"
                value={form[key]}
                onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
              />
            </label>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-primary mt-6"
          onClick={() => onToast('Profile saved on this device')}
        >
          Save profile
        </button>
      </section>
      <section className="panel p-6">
        <h2 className="text-lg font-bold">Preferences</h2>
        <ul className="mt-5 space-y-4">
          {[
            ['alerts', 'Exception alerts', 'Ping me when a metric leaves its band.'],
            ['digest', 'Monday digest', 'A short read before standup.'],
            ['clients', 'Client room updates', 'Notify when a client comments.'],
          ].map(([key, label, copy]) => (
            <li key={key} className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">{label}</p>
                <p className="text-sm text-[var(--muted)]">{copy}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={toggles[key]}
                data-on={toggles[key]}
                className="switch"
                onClick={() => setToggles((current) => ({ ...current, [key]: !current[key] }))}
              >
                <i />
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between rounded-2xl bg-[var(--surface-2)] px-4 py-3">
          <div>
            <p className="font-semibold">Appearance</p>
            <p className="text-sm text-[var(--muted)]">Currently {theme} mode</p>
          </div>
          <ThemeToggle />
        </div>
      </section>
    </div>
  )
}

export default function Dashboard() {
  const [view, setView] = useState('overview')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [toast, setToast] = useState('')

  const [user] = useState(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem('halcyon-user') || 'null')
      if (stored?.email) {
        const initials = stored.name
          .split(' ')
          .map((part) => part[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()
        return { ...stored, initials: initials || 'M' }
      }
    } catch {
      /* demo profile */
    }
    return { name: 'Jordan Hale', email: 'prashanth12@gmail.com', initials: 'JH' }
  })

  useEffect(() => {
    if (!toast) return undefined
    const id = window.setTimeout(() => setToast(''), 2400)
    return () => window.clearTimeout(id)
  }, [toast])

  function onQuery(value) {
    setQuery(value)
    if (value && view !== 'customers' && view !== 'overview') setView('customers')
  }

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-[var(--bg)] text-[var(--ink)]">
      <Sidebar
        view={view}
        onView={setView}
        open={open}
        collapsed={collapsed}
        onClose={() => setOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          title={titles[view]}
          query={query}
          onQuery={onQuery}
          onMenu={() => setOpen(true)}
          collapsed={collapsed}
          onCollapse={() => setCollapsed((value) => !value)}
          user={user}
        />
        <main className="min-h-0 w-full min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
          <div className="mb-5 flex w-full flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-[var(--muted)]">Good to see you, {user.name.split(' ')[0]}.</p>
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">{titles[view]}</h2>
            </div>
            <label className="relative md:hidden">
              <span className="sr-only">Search customers</span>
              <Icon name="search" className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
              <input
                value={query}
                onChange={(event) => onQuery(event.target.value)}
                placeholder="Search customers"
                className="field py-2.5 pl-10"
              />
            </label>
          </div>
          {view === 'overview' && <Overview query={query} onToast={setToast} />}
          {view === 'analytics' && <Analytics />}
          {view === 'customers' && <Customers query={query} />}
          {view === 'billing' && <Billing onToast={setToast} />}
          {view === 'settings' && <Settings user={user} onToast={setToast} />}
        </main>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
