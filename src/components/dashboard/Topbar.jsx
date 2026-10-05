import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon'
import ThemeToggle from '../ThemeToggle'
import { activity } from '../../data/content'

export default function Topbar({
  title,
  query,
  onQuery,
  onMenu,
  collapsed,
  onCollapse,
  user,
}) {
  const [notesOpen, setNotesOpen] = useState(false)
  const wrap = useRef(null)

  useEffect(() => {
    const onPointer = (event) => {
      if (!wrap.current?.contains(event.target)) setNotesOpen(false)
    }
    window.addEventListener('pointerdown', onPointer)
    return () => window.removeEventListener('pointerdown', onPointer)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-3 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] px-4 backdrop-blur-xl sm:px-6">
      <button
        type="button"
        className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] lg:hidden"
        aria-label="Open sidebar"
        onClick={onMenu}
      >
        <Icon name="menu" />
      </button>
      <button
        type="button"
        className="hidden h-10 w-10 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] lg:grid"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        onClick={onCollapse}
      >
        <Icon name="chevron" className={`h-4 w-4 transition ${collapsed ? '' : 'rotate-180'}`} />
      </button>
      <div className="min-w-0">
        <p className="truncate text-sm text-[var(--muted)]">Workspace</p>
        <h1 className="truncate text-base font-bold">{title}</h1>
      </div>
      <label className="relative ml-auto hidden min-w-0 flex-1 md:block md:max-w-sm">
        <span className="sr-only">Search customers</span>
        <Icon name="search" className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
        <input
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder="Search customers"
          className="field py-2.5 pr-3 pl-10"
        />
      </label>
      <ThemeToggle />
      <div className="relative" ref={wrap}>
        <button
          type="button"
          aria-label="Notifications"
          aria-expanded={notesOpen}
          onClick={() => setNotesOpen((open) => !open)}
          className="relative grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)]"
        >
          <Icon name="bell" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[var(--sienna)]" />
        </button>
        {notesOpen && (
          <div className="menu-panel absolute right-0 mt-2 w-80 max-w-[80vw] rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 shadow-[var(--shadow)]">
            <p className="px-2 text-sm font-bold">Latest activity</p>
            <ul className="mt-2">
              {activity.slice(0, 4).map((item) => (
                <li key={item.title} className="rounded-xl px-2 py-2 hover:bg-[var(--surface-2)]">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-[var(--muted)]">{item.time}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="hidden items-center gap-2 sm:flex">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--ink)] text-sm font-bold text-[var(--bg)]">
          {user.initials}
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold">{user.name}</p>
          <p className="max-w-36 truncate text-xs text-[var(--muted)]">{user.email}</p>
        </div>
      </div>
    </header>
  )
}
