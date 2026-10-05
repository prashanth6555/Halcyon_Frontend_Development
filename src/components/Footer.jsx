import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

const year = new Date().getFullYear()

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Method', href: '#method' },
      { label: 'Dashboard', to: '/dashboard' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { label: 'Stories', href: '#stories' },
      { label: 'Log in', to: '/login' },
      { label: 'Get started', to: '/login' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)
  const [error, setError] = useState('')

  function onSubmit(event) {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email.')
      setJoined(false)
      return
    }
    setError('')
    setJoined(true)
  }

  return (
    <footer className="band-ink w-full">
      <div className="grid w-full gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8 lg:py-16">
        <div>
          <Logo light to="/" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#d9d0c3]">
            Halcyon is the calm command center for studios that bill, deliver, and report from the same set of numbers.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-xs font-bold tracking-[0.16em] text-[#c9a15b] uppercase">{column.title}</p>
            <ul className="mt-4 space-y-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link to={link.to} className="text-sm text-[#f6f1e8]/85 transition hover:text-white">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm text-[#f6f1e8]/85 transition hover:text-white">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="w-full border-t border-white/10 px-4 py-6 sm:px-6 lg:px-8">
        <form onSubmit={onSubmit} className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
          <label className="sr-only" htmlFor="footer-email">
            Email for product notes
          </label>
          <input
            id="footer-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Work email for product notes"
            className="field border-white/15 bg-white/5 text-[#f6f1e8] placeholder:text-white/45 sm:max-w-sm"
          />
          <button type="submit" className="btn btn-light !px-5 !py-2.5">
            {joined ? 'You are on the list' : 'Join the list'}
          </button>
          {error && <p className="text-sm text-[#ffb4a2]">{error}</p>}
        </form>
        <div className="mt-6 flex w-full flex-col gap-2 text-xs text-[#d9d0c3] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Halcyon. All rights reserved.</p>
          <p>Built for teams who would rather look at the work than the tooling.</p>
        </div>
      </div>
    </footer>
  )
}
