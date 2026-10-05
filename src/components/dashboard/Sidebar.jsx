import { Link, NavLink } from 'react-router-dom'
import Icon from '../Icon'
import Logo, { Mark } from '../Logo'

const items = [
  { id: 'overview', label: 'Overview', icon: 'home' },
  { id: 'analytics', label: 'Analytics', icon: 'chart' },
  { id: 'customers', label: 'Customers', icon: 'users' },
  { id: 'billing', label: 'Billing', icon: 'card' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
]

export default function Sidebar({ view, onView, open, collapsed, onClose }) {
  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh flex-col border-r border-[var(--line)] bg-[var(--surface)] transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } ${collapsed ? 'w-[84px]' : 'w-[248px]'}`}
      >
        <div className={`flex h-16 items-center border-b border-[var(--line)] ${collapsed ? 'justify-center px-2' : 'px-4'}`}>
          {collapsed ? (
            <Link to="/" aria-label="Halcyon home" className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--ink)] text-[var(--bg)]">
              <Mark />
            </Link>
          ) : (
            <Logo />
          )}
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Workspace">
          {items.map((item) => {
            const active = view === item.id
            return (
              <button
                key={item.id}
                type="button"
                title={item.label}
                onClick={() => {
                  onView(item.id)
                  onClose()
                }}
                className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition ${
                  active
                    ? 'bg-[var(--ink)] text-[var(--bg)]'
                    : 'text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <Icon name={item.icon} className="h-5 w-5 shrink-0" />
                {!collapsed && item.label}
              </button>
            )
          })}
        </nav>
        <div className="border-t border-[var(--line)] p-3">
          <NavLink
            to="/"
            title="Log out"
            className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--surface-2)] hover:text-[var(--ink)] ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <Icon name="logout" className="h-5 w-5" />
            {!collapsed && 'Log out'}
          </NavLink>
        </div>
      </aside>
    </>
  )
}
